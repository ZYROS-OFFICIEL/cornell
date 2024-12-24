document.addEventListener("DOMContentLoaded", () => {
    const saveButton = document.getElementById("save-btn");
    const exportButton = document.getElementById("export-btn");
    const clearButton = document.getElementById("clear-btn");

    saveButton?.addEventListener("click", () => recordEvent("save"));
    exportButton?.addEventListener("click", () => recordEvent("export"));
    clearButton?.addEventListener("click", () => recordEvent("clear"));

    function recordEvent(action) {
        fetch("/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action,
                timestamp: new Date().toISOString(),
            }),
        }).catch((err) => console.error("Analytics error:", err));
    }
});
