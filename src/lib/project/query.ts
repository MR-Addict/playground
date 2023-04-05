export default function query(user: string, repo: string) {
  return `
{
  repository(owner: "${user}", name: "${repo}") {
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
}
`;
}
