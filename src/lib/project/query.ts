function queryOne(index: number, owner: string, name: string) {
  return `
repo${index}: repository(owner: "${owner}", name: "${name}") {
  name
  url
  createdAt
  homepageUrl
  description
  stargazers {
    totalCount
  }
  forks {
    totalCount
  }
  primaryLanguage {
    name
  }
  repositoryTopics(first:10) {
    edges {
      node {
        topic {
          name
        }
      }
    }
  }
  ref(qualifiedName:"main") {
    target {
      ... on Commit {
        history(first:1) {
          edges {
            node {
              committedDate
            }
          }
        }
      }
    }
  }
}
`;
}

export default function query(data: { owner: string; name: string }[]) {
  return `
{
  ${data.map((item, index) => queryOne(index + 1, item.owner, item.name)).join("\n")}
}
`;
}
