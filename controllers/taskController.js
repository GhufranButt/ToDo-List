const { userInfo } = require("os");
const db = require("../db");
// const User = require();
module.exports.getFilteredTasks = (req, res) => {
  const { title, username, completion_date } = req.query;
  let query = `
    SELECT Tasks.* 
    FROM Tasks  
    JOIN Users ON Tasks.user_id = Users.user_id
    WHERE 1
  `;
  const queryParams = [];

  if (completion_date) {
    query += " AND completion_date = ?";
    queryParams.push(completion_date);
  }

  if (title) {
    query += " AND title LIKE ?";
    queryParams.push(`%${title}%`);
  }

  if (username) {
    query += " AND username = ?";
    queryParams.push(username);
  }

  console.log("Query:", query); // Log the constructed query
  console.log("Query Params:", queryParams); // Log the query parameters

  db.query(query, queryParams, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error retrieving data",
        status: 500,
        error: error.message,
      });
    }
    res.status(200).json({
      message: "Successfully retrieved",
      status: 200,
      data: result,
    });
  });
};

module.exports.post = (req, res) => {
  const data = req.body;
  db.query("Insert into Tasks set ?", data, (error, result) => {
    if (error) {
      res.status(404).json({
        message: "Can not Insert Data",
        status: 404,
        error: error.message,
      });
    } else {
      res.status(200).json({
        message: "Successfully Insert Data",
        status: 200,
        data: result,
      });
    }
  });
};

// module.exports.put = (req, res) => {
//   const data = [
//     req.body.title,
//     req.body.description,
//     req.body.due_date,
//     req.body.priority,
//     req.body.status,
//     req.body.user_id,
//   ];

//   const id = req.params.id;

//   db.query(
//     "UPDATE Tasks SET title = ?, description = ?, due_date = ?, priority=?, status=?, user_id=? Where task_id =?",
//     [...data, id], // Concatenate data array with id
//     (error, result) => {
//       if (error) {
//         res.status(404).json({
//           message: "Can not Update data",
//           status: 404,
//           error: error.message,
//         });
//       } else {
//         res.status(200).json({
//           message: "Successfully Updated",
//           status: 200,
//           data: data,
//           result: result,
//         });
//       }
//     }
//   );
// };

module.exports.put = (req, res) => {
  const {
    title,
    description,
    due_date,
    priority,
    status,
    user_id,
    completion_date,
  } = req.body;
  const id = req.params.id;

  const set = [];

  const values = [];

  if (title !== undefined) {
    set.push("title = ?");
    values.push(title);
  }
  if (description !== undefined) {
    set.push("description = ?");
    values.push(description);
  }
  if (due_date !== undefined) {
    set.push("due_date = ?");
    values.push(due_date);
  }
  if (priority !== undefined) {
    set.push("priority = ?");
    values.push(priority);
  }
  if (status !== undefined) {
    set.push("status = ?");
    values.push(status);
  }
  if (user_id !== undefined) {
    set.push("user_id = ?");
    values.push(user_id);
  }

  if (completion_date !== undefined) {
    set.push("completion_date = ?");
    values.push(completion_date);
  }
  if (set.length === 0) {
    return res.status(400).json({
      message: "No fields provided for update",
      status: 400,
    });
  }

  const setQuery = set.join(", ");

  const query = `UPDATE Tasks SET ${setQuery} WHERE task_id = ?`;

  // Add the task_id value to the values array
  values.push(id);
  console.log("set", set);
  console.log("values", values);

  // Execute the query
  db.query(query, values, (error, result) => {
    if (error) {
      res.status(404).json({
        message: "Can not Update data",
        status: 404,
        error: error.message,
      });
    } else {
      res.status(200).json({
        message: "Successfully Updated",
        status: 200,
        data: req.body, // Return the updated fields
        result: result,
      });
    }
  });
};

module.exports.delete = (req, res) => {
  db.query(
    "DELETE FROM Tasks WHERE task_id = ?",
    [req.params.id],
    (error, result) => {
      if (error) {
        res.status(500).json({
          message: "Error deleting data",
          status: 500,
          error: error.message,
        });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({
            error: "ID does not exist",
          });
        } else {
          res.status(200).json({
            message: "Successfully Deleted",
            status: 200,
            data: result,
          });
        }
      }
    }
  );
};
