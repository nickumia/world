# To feed into https://sankeymatic.com/build/
import json

def calculate_sankey(data):
    # 1. Initialize weights
    weights = {node['id']: 0 for node in data['nodes']}
    
    # 2. Set starting flow (Level 0)
    level_0_nodes = [n for n in data['nodes'] if n['level'] == 0]
    start_weight = data['total_flow'] / len(level_0_nodes)
    for n in level_0_nodes:
        weights[n['id']] = start_weight

    # 3. Sort nodes by level to ensure flow moves forward
    sorted_nodes = sorted(data['nodes'], key=lambda x: x['level'])
    
    results = []

    # 4. Calculate flows
    for node in sorted_nodes:
        targets = node.get('links_to', [])
        if not targets:
            continue
            
        # Divide current node's weight by number of outgoing links
        outbound_share = weights[node['id']] / len(targets)
        
        for target_id in targets:
            # Create the Sankey string: Source [Weight] Target
            results.append(f"{node['id']} [{outbound_share:.2f}] {target_id}")
            
            # Accumulate weight in the target node for the next level
            if target_id in weights:
                weights[target_id] += outbound_share
            else:
                weights[target_id] = outbound_share

    return results

# Example Usage:
with open("./study.json", "r") as f:
    study_data = json.load(f)

sankey_lines = calculate_sankey(study_data)
print("\n".join(sankey_lines))
