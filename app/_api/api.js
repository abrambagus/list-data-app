export const getPaymentData = async () => {
  const res = await fetch("https://delman-fe-api.fly.dev/", { method: "GET" });
  return res.json();
};

export const getUsersData = async () => {
  const res = await fetch("https://delman-fe-api.fly.dev/users", {
    method: "GET",
  });
  return res.json();
};

export const postUsersData = async (data) => {
  const res = await fetch("https://delman-fe-api.fly.dev/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res;
};
