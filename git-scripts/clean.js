import simpleGit from "simple-git";

const git = simpleGit();

async function cleanHistory() {
  try {
    await git.raw([
      "filter-branch",
      "--force",
      "--index-filter",
      "git rm --cached --ignore-unmatch .env",
      "--prune-empty",
      "--tag-name-filter",
      "cat",
      "--",
      "--all",
    ]);
    await git.push("origin", "main", { "--force": null });
    console.log(
      "Git history has been cleaned, and changes have been force-pushed."
    );
  } catch (error) {
    console.error("Error cleaning Git history:", error);
  }
}

cleanHistory();
