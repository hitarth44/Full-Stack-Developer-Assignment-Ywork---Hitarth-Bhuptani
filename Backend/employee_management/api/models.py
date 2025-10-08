from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=100)
    base_salary = models.FloatField(default=0)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='employees')

    def __str__(self):
        return self.name


class LeaveApplication(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    month = models.IntegerField()
    year = models.IntegerField()
    no_of_leaves = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.employee.name} - {self.month}/{self.year}"
