import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { listCategories } from "../../apiClient/categoryService";
import Category from "../../interfaces/category"

function CategoryList() {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    listAllCategories();
  }, [])

  async function listAllCategories() {
    try {
      const allCategories = (await listCategories()).data;
      setCategories(allCategories);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  return (
    <div className="container pt-5">
      <h2>Categories</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id, title, description }) => (
            <tr key={id} >
              <td>{title}</td>
              <td>{description}</td>
              <td>
                <Button
                  size="sm"
                  variant="secondary"
                  className="me-2"
                >
                  Add word
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </div>
  )
}

export default CategoryList
