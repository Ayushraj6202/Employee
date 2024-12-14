import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  Layout, SignIn, EmployeePage, EmpList, AddEmployee, EmployeeDetails, AttendanceDetails, SalaryDetails,
  DepartmentPage, DeptList, AddDepartment, DepartmentDetails,
  DesignationPage, DesigList, AddDesignation, DesignationDetails,
  RegisterAdmin, AllAdmins
} from './pages'
import Home from './pages/Home.jsx'
import Profile from './components/Profile.jsx'
import { Provider } from 'react-redux';
import store from './store/store.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>

      <Route path='/Home' element={<Home />} ></Route>

      <Route path='/sign-in' element={<SignIn />}> </Route>

      <Route path='/admin/profile' element={<Profile/>}> </Route>
      <Route path='/admin/register' element={<RegisterAdmin/>}></Route>
      <Route path='/admin/all' element={<AllAdmins/>}></Route>

      <Route path='/Employees' element={<EmployeePage />}>
        <Route path='' element={<EmpList />}> </Route>
        <Route path='add-employee' element={<AddEmployee />}> </Route>
        <Route path='details/:id' element={<EmployeeDetails />}> </Route>
        <Route path='attendance/:id' element={<AttendanceDetails />}> </Route>
        <Route path='feedback/:id' element={<EmployeeDetails />}> </Route>
        <Route path='salary/:id' element={<SalaryDetails />}> </Route>
      </Route>

      <Route path='/Departments' element={<DepartmentPage />}>
        <Route path='' element={<DeptList />}> </Route>
        <Route path='add-department' element={<AddDepartment />}> </Route>
        <Route path='details/:id' element={<DepartmentDetails />}> </Route>
      </Route>

      <Route path='/Designations' element={<DesignationPage />}>
        <Route path='' element={<DesigList />}> </Route>
        <Route path='add-designation' element={<AddDesignation />}> </Route>
        <Route path='details/:id' element={<DesignationDetails />}> </Route>
      </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
