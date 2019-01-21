/**
* This function helps to make cancellable promise call maintaining object property cacellable.
* On sucess, excutes  a function if cancelled is false.
* On failure, handle error if cancelled is false otherwise return error.
*
* api - promise to make  call 
* parmas - input parameters for api
* callAfterResponse  - function to perform action using response
* callAfterError  - function to handle error if happens during excution of api
**/
export default function cancellableApiCall(api, params, callAfterResponse, callAfterError) {
    return {
        cancelled: false,
        cancelApicall: function () {
            this.cancelled = true;
        },
        callApi: async function callApi() {
            let response;
            try {
                response = await api(params);
            } catch (error) {
                if (typeof callAfterError === 'function') {
                    !this.cancelled && callAfterError(error);
                }
                return error;
            }
            if (typeof callAfterError === 'function') {
                !this.cancelled && callAfterResponse(response);
            }
            return response;
        }
    }
}