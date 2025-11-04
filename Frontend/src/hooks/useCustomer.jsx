import { useMutation } from "@tanstack/react-query";    

export const useCustomer = (mutationFn) => {
    return useMutation({ mutationFn });
}