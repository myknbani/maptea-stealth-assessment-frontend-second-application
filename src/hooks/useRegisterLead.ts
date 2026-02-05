import { useMutation } from 'urql';
import { graphql } from '../generated';
import type { RegisterLeadMutation, RegisterLeadMutationVariables } from '../generated/graphql';

const RegisterLeadDocument = graphql(`
  mutation RegisterLead($input: CreateLeadInput!) {
    register(newLeadData: $input) {
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
`);

export function useRegisterLead() {
  const [result, executeMutation] = useMutation<RegisterLeadMutation>(RegisterLeadDocument);

  const registerLead = async (input: RegisterLeadMutationVariables['input']) => {
    return await executeMutation({ input });
  };

  return { registerLead, ...result };
}
