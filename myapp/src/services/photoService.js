const API = `${import.meta.env.VITE_API_URL}/photos`;

export const getPhotos = async () => {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }

  return res.json();
};

export const addPhoto = async (formData) => {
  const res = await fetch(API, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to add photo");
  }

  return res.json();
};

export const updatePhoto = async (id, formData) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update photo");
  }

  return res.json();
};

export const deletePhoto = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete photo");
  }
};