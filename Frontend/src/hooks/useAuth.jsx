import {useMutation} from '@tanstack/react-query';

export const useAuth = (mutationFn) => {
    return useMutation({mutationFn });
}


// export const useVerifyAndNavigate = 