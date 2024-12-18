// clean.js or script.js

import simpleGit from "simple-git"; // Use import instead of require

const git = simpleGit();

async function commitChanges() {
  try {
    await git.add(".env");
    await git.commit("Removed sensitive data from .env");
    await git.push();
    console.log("Changes have been committed and pushed.");
  } catch (error) {
    console.error("Error committing or pushing changes:", error);
  }
}

commitChanges();
