from rest_framework import pagination

class ProductPagination(pagination.LimitOffsetPagination):
    default_limit = 5
    max_limit = 100