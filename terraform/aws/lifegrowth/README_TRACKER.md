# Life Tracker MVP

A simple web-based data entry system for tracking interactions, value statements, and selections with AWS Lambda backend and S3 storage.

```
aws lambda add-permission \
  --function-name life_tracker_api \
  --statement-id apigateway-open-test \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com

aws apigateway flush-stage-cache --rest-api-id 8gsjgs1uf4 --stage-name dev
```

## Architecture

- **Frontend**: Static HTML/CSS/JavaScript form
- **Backend**: AWS Lambda function
- **Storage**: JSON file in S3 bucket
- **API**: API Gateway for HTTP endpoints

## Data Model

### 1. Interactions
Primary data stream for notable interactions.

```json
{
  "interaction_id": "unique_id",
  "date": "2025-01-15T10:30:00",
  "context_tags": ["work", "meeting", "stress"],
  "energy_delta": -2,
  "alignment_score": 3,
  "interference_score": 7,
  "note": "Optional short note",
  "created_at": "2025-01-15T10:35:00Z"
}
```

### 2. Value Statements
Compounding engine for patterns and meaningful moments.

```json
{
  "value_id": "unique_id",
  "date_created": "2025-01-15T10:30:00",
  "statement": "I will protect my morning energy for deep work",
  "category": "energy",
  "confidence": 4,
  "source_interaction_id": "optional_interaction_id",
  "last_applied_date": null,
  "created_at": "2025-01-15T10:35:00Z"
}
```

### 3. Selections
Drift protection layer for recurring commitments.

```json
{
  "selection_id": "unique_id",
  "date_committed": "2025-01-15",
  "commitment_name": "Learn Python",
  "expected_gain": "skill",
  "review_date": "2025-04-15",
  "notes": "Optional notes",
  "created_at": "2025-01-15T10:35:00Z"
}
```

## Setup Instructions

### 1. Deploy Infrastructure

```bash
# Navigate to terraform directory
cd terraform/aws

# Initialize Terraform
terraform init

# Plan and apply
terraform plan
terraform apply
```

### 2. Deploy Lambda Function

```bash
# Create zip file
zip lambda_function.zip lambda_function.py

# Update the API endpoint in tracker.html
# Replace YOUR_LAMBDA_ENDPOINT_HERE with the actual API Gateway URL from Terraform output
```

### 3. Configure Frontend

Edit `static/tracker.html` and replace:
```javascript
const API_ENDPOINT = 'YOUR_LAMBDA_ENDPOINT_HERE';
```

With your actual API Gateway URL from Terraform output.

### 4. Test the Application

Open `static/tracker.html` in a web browser and test all three forms.

## API Endpoints

### POST /tracker
Submit new data (interactions, value statements, or selections)

Request body:
```json
{
  "type": "interactions|value_statements|selections",
  "data": { ... }
}
```

### GET /tracker
Retrieve existing data

Query parameters:
- `type` (optional): Filter by data type

## File Structure

```
├── static/
│   └── tracker.html              # Frontend form
├── lambda_function.py            # AWS Lambda backend
├── terraform/aws/
│   └── s3_tracker.tf            # Infrastructure as code
└── README_TRACKER.md            # This file
```

## Security Considerations

- S3 bucket blocks all public access
- Lambda function has minimal required permissions
- API Gateway uses AWS_IAM authentication (can be changed to public)
- Data is encrypted at rest in S3

## Scaling Considerations

- S3 versioning enabled for data backup
- Lambda timeout set to 30 seconds
- Can add CloudFront distribution for static files
- Can add DynamoDB for higher throughput needs

## Future Enhancements

- Data visualization dashboard
- Automated pattern detection
- Export functionality
- Mobile app integration
- Advanced analytics and insights

## Local Development

For local testing, you can run a simple Flask server:

```python
# test_server.py
from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

@app.route('/tracker', methods=['GET', 'POST', 'OPTIONS'])
def tracker():
    if request.method == 'OPTIONS':
        return '', 200
    
    if request.method == 'POST':
        data = request.json
        # Save to local file for testing
        with open('test_data.json', 'a') as f:
            f.write(json.dumps(data) + '\n')
        return jsonify({'message': 'Data saved locally'})
    
    if request.method == 'GET':
        # Return test data
        return jsonify({'interactions': [], 'value_statements': [], 'selections': []})

if __name__ == '__main__':
    app.run(port=5000)
```

Run with:
```bash
pip install flask
python test_server.py
```

Then update `tracker.html` to use `http://localhost:5000/tracker` as the API endpoint for local testing.
