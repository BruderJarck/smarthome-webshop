import django_filters
from .models import ProductModel

class ProductFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__name', lookup_expr='icontains', method='filter_by_categories')

    class Meta:
        model = ProductModel
        fields = ['category']
    
    def filter_by_categories(self, queryset, name, value):
      category_names = value.split(',')
      return queryset.filter(category__name__in=category_names)