<!-- {
  uniqueID: Number
  clientName: String,
  species: String,
  timeOfVisit: Date,
  owner: {
    name: String,
    address: String,
    phoneNumber: Number,
    email: String
  }
} -->
# List client information

  ## List a specific client's information:
  `GET /clients/:uniqueID`

  uniqueID is a number

  ## or if called with no unique ID, this will return all clients:
  `GET /clients`

  ## Response
  ```

  ```

# Add a client

  ## Add a client's information:
  `POST /clients`

  | Name        | Type  	| Description                                         |
  | ------------|---------|-----------------------------------------------------|
  | clientName	| string  |  Required. Name of the client bringing pet to store.|
  | species     | string  | Required. Species of pet                            |
  | owner       | object  | Required. Contact information of pet's owner        |

  ## For example:

  ``` {
    clientName: String,
    species: String,
    owner: {
      name: String,
      address: String,
      phoneNumber: Number,
      email: String
    }
  ```

  ## Response
  ```

  ```
# Delete a client

  `DELETE /clients/:uniqueID`

  ## Response:
  ```

  ```

# Edit a client

  `PUT /clients/:uniqueID`

  | Name        | Type  	| Description                                         |
  | ------------|---------|-----------------------------------------------------|
  | clientName	| string  |  Required. Name of the client bringing pet to store.|
  | species     | string  | Required. Species of pet                            |
  | owner       | object  | Required. Contact information of pet's owner        |

  ## Response:
  ```

  ```
