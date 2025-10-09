from django.urls import path
from .views import *

urlpatterns = [
    path('departments/', DepartmentCreateView.as_view()),
    path('employees/', EmployeeCreateView.as_view()),
    path('set-base-salary/<int:pk>/', SetBaseSalaryView.as_view()),
    path('update-leave/', UpdateLeaveView.as_view()),
    path('calculate-salary/', CalculateSalaryView.as_view()),
    path('high-earners/department/<int:dept_id>/', HighEarnersInDepartment.as_view()),
    path('high-earners/month/<int:month>/<int:year>/', HighEarnersInMonth.as_view()),
]
