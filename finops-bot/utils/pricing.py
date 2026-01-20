# AWS on-demand hourly pricing (approx)
INSTANCE_PRICING = {
    "t2.micro": 0.0116,
    "t2.small": 0.023,
    "t3.micro": 0.0104,
    "t3.small": 0.0208
}

def calculate_savings(instance_type, hours_saved=1):
    hourly_cost = INSTANCE_PRICING.get(instance_type, 0.02)
    return round(hourly_cost * hours_saved, 4)
