import { useMutation } from "@tanstack/react-query";    

export const useAdmin = (mutationFn) => {
    return useMutation({ mutationFn });
}