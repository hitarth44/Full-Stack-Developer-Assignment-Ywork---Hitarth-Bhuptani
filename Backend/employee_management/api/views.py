from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Department, Employee, LeaveApplication
from .serializers import DepartmentSerializer, EmployeeSerializer, LeaveApplicationSerializer


# 1️⃣ Create Department
class DepartmentCreateView(generics.CreateAPIView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


# 2️⃣ Create Employee
class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# 3️⃣ Set Base Salary for Employee
class SetBaseSalaryView(APIView):
    def post(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            base_salary = request.data.get("base_salary")
            employee.base_salary = base_salary
            employee.save()
            return Response({"message": "Base salary updated successfully"})
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=404)


# 4️⃣ Update Leave Count
class UpdateLeaveView(APIView):
    def post(self, request):
        emp_id = request.data.get("employeeId")
        month = request.data.get("month")
        year = request.data.get("year")
        leaves = request.data.get("no_of_leaves")

        leave, created = LeaveApplication.objects.get_or_create(
            employee_id=emp_id, month=month, year=year,
            defaults={'no_of_leaves': leaves}
        )
        if not created:
            leave.no_of_leaves += int(leaves)
            leave.save()
        return Response({"message": "Leave count updated successfully"})


# 5️⃣ Calculate Payable Salary
class CalculateSalaryView(APIView):
    def post(self, request):
        emp_id = request.data.get("employeeId")
        month = request.data.get("month")
        year = request.data.get("year")

        try:
            employee = Employee.objects.get(id=emp_id)
            leave = LeaveApplication.objects.filter(employee=employee, month=month, year=year).first()
            leaves = leave.no_of_leaves if leave else 0
            payable_salary = employee.base_salary - (leaves * (employee.base_salary / 25))
            return Response({
                "employee": employee.name,
                "base_salary": employee.base_salary,
                "leaves": leaves,
                "payable_salary": payable_salary
            })
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=404)


# 6️⃣ High Earners in Department
class HighEarnersInDepartment(APIView):
    def get(self, request, dept_id):
        employees = Employee.objects.filter(department_id=dept_id)
        salaries = sorted(set(e.base_salary for e in employees), reverse=True)[:3]
        high_earners = employees.filter(base_salary__in=salaries)
        serializer = EmployeeSerializer(high_earners, many=True)
        return Response(serializer.data)


# 7️⃣ High Earners in a Specific Month
class HighEarnersInMonth(APIView):
    def get(self, request, month, year):
        leaves = LeaveApplication.objects.filter(month=month, year=year)
        result = []
        for leave in leaves:
            emp = leave.employee
            payable = emp.base_salary - (leave.no_of_leaves * (emp.base_salary / 25))
            result.append({
                "employee": emp.name,
                "department": emp.department.name,
                "payable_salary": payable
            })
        result = sorted(result, key=lambda x: x["payable_salary"], reverse=True)[:3]
        return Response(result)
