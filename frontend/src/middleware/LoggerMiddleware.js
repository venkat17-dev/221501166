// src/middleware/logger.js
export const logMiddleware = (message, level = 'info') => {
  const timestamp = new Date().toISOString();
  const formattedLog = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

  // Custom logging (NOT console.log)
  const logDiv = document.getElementById('log-store');
  if (logDiv) {
    logDiv.innerText += formattedLog + '\n';
  }
};
