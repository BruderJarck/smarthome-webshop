from models import OrderingModel
def update_status():
    order = OrderingModel.objects.filter(user=1)
    print(order)
update_status()
