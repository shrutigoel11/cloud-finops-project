import boto3

def get_instances():
    instances = []
    ec2 = boto3.resource("ec2")

    for instance in ec2.instances.all():
        instances.append({
            "instance_id": instance.id,
            "state": instance.state["Name"],
            "region": instance.placement["AvailabilityZone"][:-1],
            "instance_type": instance.instance_type
        })

    return instances

