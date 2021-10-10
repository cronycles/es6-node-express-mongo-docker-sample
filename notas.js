//INTERCEPTORS
const mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
};
const mockResponse = () => {
    let res = {
        send: function(s){return s;},
        status: function(s) {this.statusCode = s; return this;}
    };

    return res;

};
module.exports = { mockRequest, mockResponse };
let req = {
    params: {
        smartMeterId: meters.METER0,
    },
};
let res = mockResponse();


//MOCKING
let mockGetReadings = () => jest.fn();
jest.mock("../readings/readings-service", () => {
    return {
        getReadings: () => mockGetReadings,
    };
});

mockGetReadings = [
    { time: 1607686125, reading: 0.26785 },
    { time: 1607599724, reading: 0.26785 },
    { time: 1607513324, reading: 0.26785 },
];


