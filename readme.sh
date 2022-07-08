{root.api}/{version}/{grouping}/{endpoint}
SAMPLE:
http://localhost:3000/v1/auth/products


Standar Status Response
200 - OK                        --> Call API Success
201 - CREATED                   --> Post Success
400 - BAD REQUEST               --> Error on Client Side
401 - UNATHORIZED               --> User Not Authorized to the Request
403 - FORBIDEN                  --> User Not Allowed to Access
404 - NOT FOUND                 --> Request Endpoint Not Found
500 - INTERNAL SERVER RESPONSE  --> Error on Server Side
502 - BAD GATEWAY               --> Invalid Response From Another Request


GOUP: Authentication


[1] - REGISTER
{root.api}/{version}/auth/register

req:
{
    name:'Testing',
    password:123456
}

res:
{
    message: 'Success Register',
    data:
    {
        id:1,
        name: 'Testing',
        email: 'Test@email.com',
        password: 123456
    }
}

err-response
400 -> Input not valid


[2] - LOGIN
{root.api}/{version}/auth/login

req:
{

}

