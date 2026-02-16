import json
import boto3
import os
from datetime import datetime
from botocore.exceptions import ClientError

# Initialize S3 client
s3 = boto3.client('s3')
BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')
DATA_FILE = 'life_tracker_data.json'

def lambda_handler(event, context):
    """
    AWS Lambda function to handle life tracker data operations
    Supports POST requests to add new data and GET requests to retrieve data
    """
    
    try:
        # Handle CORS
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Content-Type': 'application/json'
        }
        
        # Handle OPTIONS request for CORS
        if event.get('httpMethod') == 'OPTIONS':
            return {
                'statusCode': 200,
                'headers': headers,
                'body': ''
            }
        
        # Parse request body
        if event.get('httpMethod') == 'POST':
            body = json.loads(event.get('body', '{}'))
            return handle_post_request(body, headers)
        elif event.get('httpMethod') == 'GET':
            return handle_get_request(event, headers)
        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Internal server error'})
        }

def handle_post_request(body, headers):
    """Handle POST requests to add new data"""
    
    data_type = body.get('type')
    data = body.get('data')
    
    if not data_type or not data:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Missing type or data'})
        }
    
    # Validate data type
    valid_types = ['interactions', 'value_statements', 'selections']
    if data_type not in valid_types:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': f'Invalid data type. Must be one of: {valid_types}'})
        }
    
    # Validate data structure
    validation_error = validate_data(data_type, data)
    if validation_error:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': validation_error})
        }
    
    # Add timestamp
    data['created_at'] = datetime.utcnow().isoformat()
    
    # Save to S3
    try:
        existing_data = get_existing_data()
        existing_data[data_type].append(data)
        save_data_to_s3(existing_data)
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'message': 'Data saved successfully',
                'id': data.get(f'{data_type[:-1]}_id') or data.get('selection_id') or data.get('value_id')
            })
        }
        
    except Exception as e:
        print(f"Error saving data: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Failed to save data'})
        }

def handle_get_request(event, headers):
    """Handle GET requests to retrieve data"""
    
    query_params = event.get('queryStringParameters', {}) or {}
    data_type = query_params.get('type')
    
    try:
        existing_data = get_existing_data()
        
        if data_type:
            # Return specific data type
            valid_types = ['interactions', 'value_statements', 'selections']
            if data_type not in valid_types:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': f'Invalid data type. Must be one of: {valid_types}'})
                }
            
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'type': data_type,
                    'data': existing_data.get(data_type, [])
                })
            }
        else:
            # Return all data
            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps(existing_data)
            }
            
    except Exception as e:
        print(f"Error retrieving data: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Failed to retrieve data'})
        }

def get_existing_data():
    """Retrieve existing data from S3 or return empty structure"""
    
    try:
        response = s3.get_object(Bucket=BUCKET_NAME, Key=DATA_FILE)
        existing_data = json.loads(response['Body'].read().decode('utf-8'))
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            # File doesn't exist, create empty structure
            existing_data = {
                'interactions': [],
                'value_statements': [],
                'selections': [],
                'metadata': {
                    'created_at': datetime.utcnow().isoformat(),
                    'version': '1.0'
                }
            }
        else:
            raise e
    except Exception as e:
        print(f"Error reading existing data: {str(e)}")
        raise e
    
    return existing_data

def save_data_to_s3(data):
    """Save data to S3"""
    
    # Update metadata
    data['metadata']['last_updated'] = datetime.utcnow().isoformat()
    
    s3.put_object(
        Bucket=BUCKET_NAME,
        Key=DATA_FILE,
        Body=json.dumps(data, indent=2),
        ContentType='application/json'
    )

def validate_data(data_type, data):
    """Validate data structure based on type"""
    
    if data_type == 'interactions':
        required_fields = ['interaction_id', 'date', 'context_tags', 'energy_delta', 'alignment_score', 'interference_score']
        return validate_fields(data, required_fields, {
            'energy_delta': {'type': int, 'min': -3, 'max': 3},
            'alignment_score': {'type': int, 'min': 0, 'max': 10},
            'interference_score': {'type': int, 'min': 0, 'max': 10},
            'context_tags': {'type': list}
        })
    
    elif data_type == 'value_statements':
        required_fields = ['value_id', 'date_created', 'statement', 'category', 'confidence']
        return validate_fields(data, required_fields, {
            'confidence': {'type': int, 'min': 1, 'max': 5},
            'category': {'type': str, 'options': ['energy', 'social', 'decision', 'focus', 'other']}
        })
    
    elif data_type == 'selections':
        required_fields = ['selection_id', 'date_committed', 'commitment_name', 'expected_gain', 'review_date']
        return validate_fields(data, required_fields, {
            'expected_gain': {'type': str, 'options': ['skill', 'relationship', 'optionality', 'energy', 'money', 'other']}
        })
    
    return None

def validate_fields(data, required_fields, field_validations=None):
    """Validate required fields and their constraints"""
    
    # Check required fields
    for field in required_fields:
        if field not in data:
            return f'Missing required field: {field}'
    
    # Check field validations
    if field_validations:
        for field, validation in field_validations.items():
            if field in data and data[field] is not None:
                value = data[field]
                
                # Type validation
                if 'type' in validation:
                    if not isinstance(value, validation['type']):
                        return f'Field {field} must be of type {validation["type"].__name__}'
                
                # Range validation
                if 'min' in validation and value < validation['min']:
                    return f'Field {field} must be at least {validation["min"]}'
                if 'max' in validation and value > validation['max']:
                    return f'Field {field} must be at most {validation["max"]}'
                
                # Options validation
                if 'options' in validation and value not in validation['options']:
                    return f'Field {field} must be one of: {validation["options"]}'
    
    return None
