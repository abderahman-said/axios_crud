import { Table, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Read() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("https://62431f84b6734894c15b41ad.mockapi.io/users")
      .then((res) => {
        setApiData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const setData = (data) => {
    let { id, firtname, lastName, checkBox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("Firt-Name", firtname);
    localStorage.setItem("Last-Name", lastName);
    localStorage.setItem("Checkbox-Value", checkBox);
    console.log(data);
  };
  const onDelete = (id) => {
    axios
      .delete(`https://62431f84b6734894c15b41ad.mockapi.io/users/${id}`)
      .then(() => getData())
      .catch((error) => {
        console.log(error);
      });
  };
  const getData = () => {
    axios
      .get("https://62431f84b6734894c15b41ad.mockapi.io/users")
      .then((getData) => {
        setApiData(getData.data);
      });
  };
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>FirtName</Table.HeaderCell>
            <Table.HeaderCell>LastName</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {apiData.map((data) => (
            <Table.Row key={data.id}>
              <Table.Cell>{data.firtname}</Table.Cell>
              <Table.Cell>{data.lastName}</Table.Cell>
              <Table.Cell>{data.checkBox ? "checked" : "unchecked"}</Table.Cell>
              <Link to="/update">
                <Table.Cell>
                    <button className="button_two" onClick={() => setData(data)}>
                        <span>Update</span>
                    </button>
                </Table.Cell>
              </Link>
                <Table.Cell>
                {/* <Button onClick={() => onDelete(data.id)}>Delete</Button> */}
                <button className="button" onClick={() => onDelete(data.id)}>
                    <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
