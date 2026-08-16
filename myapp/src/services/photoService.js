const API = "http://localhost:5000/photos";

export const getPhotos = async () => {

  const res = await fetch(API);

  return res.json();

};

export const addPhoto = async (formData) => {

  const res = await fetch(API, {
    method: "POST",
    body: formData
  });

  return res.json();
};

export const updatePhoto = async (id, formData) => {

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: formData
  });

  return res.json();
};

export const deletePhoto = async (id) => {

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

};