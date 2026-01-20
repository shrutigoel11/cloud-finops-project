import boto3
from botocore.exceptions import ClientError

def stop_instance(instance_id, region):
    ec2 = boto3.client("ec2", region_name=region)

    try:
        print(f"🚨 Sending STOP request to AWS for {instance_id}")
        ec2.stop_instances(InstanceIds=[instance_id])
        print(f"✅ Stop request sent for {instance_id}")
    except ClientError as e:
        if e.response["Error"]["Code"] == "IncorrectInstanceState":
            print(f"ℹ️ Instance already stopped: {instance_id}")
        else:
            raise e
