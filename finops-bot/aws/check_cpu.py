import boto3
from datetime import datetime, timedelta

def get_cpu(instance):
    instance_id = instance["instance_id"]  # 👈 extract string

    cloudwatch = boto3.client("cloudwatch")

    response = cloudwatch.get_metric_statistics(
        Namespace="AWS/EC2",
        MetricName="CPUUtilization",
        Dimensions=[
            {
                "Name": "InstanceId",
                "Value": instance_id
            }
        ],
        StartTime=datetime.utcnow() - timedelta(minutes=10),
        EndTime=datetime.utcnow(),
        Period=300,
        Statistics=["Average"]
    )

    datapoints = response.get("Datapoints", [])

    if not datapoints:
        return 0.0

    return datapoints[0]["Average"]
