// 📂 store/photostore.js
const STORAGE_KEY = "PERMANENT_PHOTOS";

const loadPhotos = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const savePhotos = (photos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
};

let listeners = [];

const notify = () =>
  listeners.forEach((cb) => cb([...photoStore.photos]));

const normalize = (cat) =>
  cat?.toString().trim().toUpperCase();

const photoStore = {
  photos: loadPhotos(),

  subscribe(cb) {
    listeners.push(cb);
    cb([...this.photos]);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
    };
  },

  add(photo) {
    const newPhoto = {
      ...photo,
      id: Date.now(),             // ⭐ generate id
      category: normalize(photo.category),
    };

    this.photos = [...this.photos, newPhoto];
    savePhotos(this.photos);
    notify();
  },

  update(id, updated) {
    const updatedPhoto = {
      ...updated,
      id,
      category: normalize(updated.category),
    };

    this.photos = this.photos.map((p) =>
      p.id === id ? updatedPhoto : p
    );

    savePhotos(this.photos);
    notify();
  },

  delete(id) {
    this.photos = this.photos.filter((p) => p.id !== id);
    savePhotos(this.photos);
    notify();
  },

  getByCategory(category) {
    const target = normalize(category);
    return this.photos.filter(
      (p) => normalize(p.category) === target
    );
  },
};

export default photoStore;
