// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
	node: () => process.versions.node,
	chrome: () => process.versions.chrome,
	electron: () => process.versions.electron,
	ping: () => ipcRenderer.invoke("ping"),
});

const sum = (a, b) => {
	console.log(Number(a) + Number(b));
};
// It seems like we can add any amount of contexts and listeners and then call them in the renderer
contextBridge.exposeInMainWorld("testing", {
	log: () => console.log("Llamado desde el context bridge pa"),
	add: (a, b) => sum(a, b),
	// we can also expose variables, not just functions
});
