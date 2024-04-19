"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCategories } from "@/app/slices/categorySlice";
import { selectCategory, selectType } from "@/app/slices/categorySlice";

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [csvData, setCsv] = useState("No Data");
  const [PremiumFeature, setPremiumFeature] = useState(false);

  const categories = useSelector(selectCategories);
  const category = useSelector(selectCategory);
  const typeOfForm = useSelector(selectType);

  const expenses = [{id:null, amount: "", description:"", category: "", isEdit: ""}]
  

  return (
    <div className="w-2/3">
      <Row className="p-1 mx-1 borderBottom shadow text-center rounded flex">
        
        <Col xs={6}>
          <h2>{category && `Category - ${category.title}` }</h2>
        </Col>
      
      </Row>

      <Table responsive="sm" className="text-center mx-1">
        {  typeOfForm === "Category" ? 
        <>
        <thead>
          <tr>
            <th>#</th>
            <th>Category name</th>
            <th>Budget</th>
            <th>Expense Limit</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: "bold" }}>
          {isLoading && (
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                Loading... Please wait!
              </td>
            </tr>
          )}
          

          {!isLoading &&
            categories.length > 0 &&
            categories?.map((category:any, index:any) => {
              const { id, limit, budget, title } = category;
              return (
                <tr key={id} style={{ color: "gray" }}>
                  <td style={{ color: "gray" }}>{index + 1}</td>
                  <td style={{ color: "green" }}>{title}</td>
                  <td style={{ color: "gray" }}>{budget}</td>
                  <td style={{ color: "gray" }}>{limit}</td>
                  <td colSpan={2}>
                    <>
                      <Button
                        variant="danger"
                        className="mx-3 wave-effect btn btn-sm fontWeight-bold"
                        // onClick={() => deleteExpense(`${id}`)}
                        style={{ fontWeight: "bold" }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="mx-3 wave-effect btn btn-sm"
                        // onClick={() =>
                        //   editExpense(id, amount, description, category)
                        // }
                        style={{ fontWeight: "bold" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="mx-3 wave-effect btn btn-sm"
                        // onClick={() =>
                        //   editExpense(id, amount, description, category)
                        // }
                        style={{ fontWeight: "bold" }}
                      >
                        Details
                      </Button>
                    </>
                  </td>
                </tr>            
              );
            })}
        </tbody>
        </>
        : 
        <>
        <thead>
          <tr>
            <th>#</th>
            <th>Expense</th>
            <th>Amount</th>
            <th>Category</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: "bold" }}>
          {isLoading && (
            <tr>
              <td colSpan={6} style={{ color: "red" }}>
                Loading... Please wait!
              </td>
            </tr>
          )}
          

          {!isLoading &&
            expenses.length > 0 &&
            expenses?.map((expense:any, index:any) => {
              const { id, name, amount} = expense;
              return (
                <tr key={id} style={{ color: "gray" }}>
                  <td style={{ color: "gray" }}>{index + 1}</td>
                  <td style={{ color: "green" }}>{name}</td>
                  <td style={{ color: "gray" }}>{amount}</td>
                  <td style={{ color: "gray" }}>{""}</td>
                  <td colSpan={2}>
                    <>
                      <Button
                        variant="danger"
                        className="mx-3 wave-effect btn btn-sm fontWeight-bold"
                        // onClick={() => deleteExpense(`${id}`)}
                        style={{ fontWeight: "bold" }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="mx-3 wave-effect btn btn-sm"
                        // onClick={() =>
                        //   editExpense(id, amount, description, category)
                        // }
                        style={{ fontWeight: "bold" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="mx-3 wave-effect btn btn-sm"
                        // onClick={() =>
                        //   editExpense(id, amount, description, category)
                        // }
                        style={{ fontWeight: "bold" }}
                      >
                        Details
                      </Button>
                    </>
                  </td>
                </tr>            
              );
            })}
        </tbody>
        </>
        }
      </Table>
    </div>
  );
};

export default CategoryList;
