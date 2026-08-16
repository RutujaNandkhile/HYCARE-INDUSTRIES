const DB_NAME = "SliderDB";
const STORE_NAME = "sliders";


export function openDB() {
return new Promise((resolve, reject) => {
const request = indexedDB.open(DB_NAME, 1);


request.onupgradeneeded = () => {
const db = request.result;
if (!db.objectStoreNames.contains(STORE_NAME)) {
db.createObjectStore(STORE_NAME, { keyPath: "id" });
}
};


request.onsuccess = () => resolve(request.result);
request.onerror = () => reject(request.error);
});
}


export async function getAllSliders() {
const db = await openDB();
return new Promise(resolve => {
const tx = db.transaction(STORE_NAME, "readonly");
const store = tx.objectStore(STORE_NAME);
const req = store.getAll();
req.onsuccess = () => resolve(req.result);
});
}


export async function addSlider(slider) {
const db = await openDB();
const tx = db.transaction(STORE_NAME, "readwrite");
tx.objectStore(STORE_NAME).put(slider);
}


export async function updateSlider(slider) {
const db = await openDB();
const tx = db.transaction(STORE_NAME, "readwrite");
tx.objectStore(STORE_NAME).put(slider);
}


export async function deleteSlider(id) {
const db = await openDB();
const tx = db.transaction(STORE_NAME, "readwrite");
tx.objectStore(STORE_NAME).delete(id);
}