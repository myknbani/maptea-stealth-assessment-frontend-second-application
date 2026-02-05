import { useEffect } from 'react';
import { useQuery } from 'urql';
import { graphql } from '../generated';
import type { GetLeadsQuery } from '../generated/graphql';

const GetLeadsDocument = graphql(`
  query GetLeads($paginationOptions: ListLeadsInput!) {
    leads(listLeadsInput: $paginationOptions) {
      pageInfo {
        itemsPerPage
        currentPage
        totalItemsCount
        hasNextPage
        hasPreviousPage
        offset
      }
      records {
        id
        fullName
        email
        mobileNumber
        postCode
        serviceTypes {
          name
        }
        createdAt
      }
    }
  }
`);

export function useLeads() {
  const [result, reexecuteQuery] = useQuery<GetLeadsQuery>({
    query: GetLeadsDocument,
    variables: {
      paginationOptions: {
        currentPage: 1,
        itemsPerPage: 10,
      },
    },
    requestPolicy: 'network-only',
  });

  useEffect(() => {
    let timeoutId: number;

    const poll = () => {
      reexecuteQuery({ requestPolicy: 'network-only' });
      timeoutId = setTimeout(poll, 10000);
    };

    timeoutId = setTimeout(poll, 10000);

    return () => clearTimeout(timeoutId);
  }, [reexecuteQuery]);

  return result;
}
