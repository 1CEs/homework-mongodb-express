const userController = {
  getUsers: async (search='') => {
    try {
      const res = await fetch(`http://localhost:3000/api/user?search=${search}`);
      const users = await res.json();
      return users;
    } catch (error) {
      console.error("Err: ", error);
      return null;
    }
  },
  addUser: async (payload) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({
          name: payload.name,
          birth: payload.birth,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Err: ", error);
      return null;
    }
  },
  updateUser: async (payload) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${payload.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
        body: JSON.stringify({
          name: payload.name,
          birth: payload.birth,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Err: ", error);
      return null;
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Err: ", error);
      return null;
    }
  },
};
