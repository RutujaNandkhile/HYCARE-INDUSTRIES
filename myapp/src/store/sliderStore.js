import { getAllSliders, addSlider, deleteSlider, updateSlider } from "./sliderDB";


class SliderStore {
sliders = [];
listeners = [];


subscribe(cb) {
this.listeners.push(cb);
this.load();
return () => {
this.listeners = this.listeners.filter(l => l !== cb);
};
}


notify() {
this.listeners.forEach(l => l(this.sliders));
}


async load() {
this.sliders = await getAllSliders();
this.notify();
}


async add(data) {
const slider = { id: Date.now(), ...data };
await addSlider(slider);
this.load();
}


async update(id, data) {
const updated = { id, ...data };
await updateSlider(updated);
this.load();
}


async delete(id) {
await deleteSlider(id);
this.load();
}
}


export default new SliderStore();