from aws.list_ec2 import get_instances
from aws.check_cpu import get_cpu
from aws.stop_ec2 import stop_instance
from core.rules_engine import is_waste
from utils.pricing import calculate_savings   # ✅ NEW

import requests
from datetime import datetime

DRY_RUN = False  # set True to test safely

print("Starting AWS FinOps Bot...")

for instance in get_instances():
    instance_id = instance["instance_id"]
    region = instance["region"]
    state = instance["state"]
    instance_type = instance["instance_type"]  # ✅ NEW

    cpu = get_cpu(instance)

    print(
        f"Instance: {instance_id} | "
        f"Type: {instance_type} | "
        f"Region: {region} | "
        f"CPU: {cpu:.2f}% | "
        f"State: {state}"
    )

    # ✅ SEND INSTANCE DATA TO BACKEND (UNCHANGED LOGIC)
    try:
        requests.post(
            "http://localhost:5000/api/instances",
            json={
                "instance_id": instance_id,
                "state": state,
                "region": region,
                "cpu": round(cpu, 2),
                "instance_type": instance_type
            },
            timeout=5
        )
        print("📦 Instance data saved")
    except Exception as e:
        print("❌ Instance API error:", e)

    # ✅ FINOPS RULE (FIXED INDENTATION + REALISTIC SAVINGS)
    if state == "running" and is_waste(cpu):

        money_saved = calculate_savings(
            instance_type,
            hours_saved=1
        )

        if DRY_RUN:
            print(
                f"[DRY RUN] WOULD STOP EC2: {instance_id} | "
                f"Estimated savings: ${money_saved}"
            )
        else:
            stop_instance(instance_id, region)
            print(
                f"[STOPPED] EC2: {instance_id} | "
                f"Estimated savings: ${money_saved}"
            )

        # ✅ SEND SAVINGS DATA (NO HARDCODED 40)
        try:
            requests.post(
                "http://localhost:5000/api/savings",
                json={
                    "resource_id": instance_id,
                    "cloud": "AWS",
                    "money_saved": money_saved,
                    "region": region,
                    "state": "stopped",
                    "instance_type": instance_type,
                    "pricing_model": "on-demand",
                    "estimated_hours_saved": 1,
                    "date": str(datetime.utcnow())
                },
                timeout=5
            )
            print(
            f"💵 Calculated Savings → "
            f"Instance: {instance_id} | "
            f"Type: {instance_type} | "
            f"Hours Saved: 1 | "
            f"Savings: ${money_saved}"
            )
            print("💰 Savings data saved")
        except Exception as e:
            print("❌ Savings API error:", e)

    elif state == "stopped":
        print(f"ℹ️ Instance already stopped, skipping: {instance_id}")

print("AWS FinOps Bot finished.")
