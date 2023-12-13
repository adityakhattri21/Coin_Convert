# Coin-Convert API

This is a simple RESTful API for working on Crypto Data from CoinGecko using Node.js, Mongoose and MongoDB.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/coin_convert.git
   
2. Navigate to the project directory
```bash
cd coin_convert
```
3. Install dependencies:
```bash 
npm install
```
4. Configure MongoDB connection:
   1. Create a .env file in the root directory.
   2. Add your MongoDB connection string: MONGODB_URI=your_mongodb_connection_string
   3. Also add the API URLs to get the data from CoinGecko. Ref : https://www.coingecko.com/api/documentation

## Usage

1. **Run the code in Dev Mode:**

   ```bash
   npm run dev
   ```
2. **Run The Command:**
    ```bash
    npm start
    ```

## API Routes

### Test Route

- **Endpoint:** `GET /`
- **Description:** Testing Route .
- **Example Request Body:** Not Required
- **Example Response:**
  ```json
  {
    "message": "Working"
  }

### Update the list In DB

- **Endpoint:** `POST api/v1/coins/update`
- **Description:** Add/Update the data in Database.
- **Example Request Body:** Not Required
- **Example Response:**
  ```json
  {
   "success":true,
   "message":"Database Updated"
  }

### Get Converted Rates

- **Endpoint:** `POST /api/v1/coin/convert`
- **Description:** Converts the value of One Coin in terms of other based on there rates on specific date.
- **Example Request Body:**
  ```json
  {
	"fromCurrency": "bitcoin",
	"toCurrency": "0x",
	"date": "12-2-2023"
  }
  
- **Example Response:**

  ```json
  {
    "success": true,
    "data": "1 Bitcoin = 90074.57414353701 0x Protocol"
  }

**Appropriate Error handlers are in place to return meaningful error message with appropriate statusCode.**<br>
**A Cron Job is also defined in the server that updates the Database every hour.**
