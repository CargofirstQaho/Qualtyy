// API Configuration
const API_BASE_URL = "http://localhost:3214"; // direct to your backend

export const apiService = {
  // login: async (credentials) => {
  //   try {
  //     const response = await fetch(API_BASE_URL + "/v1/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(credentials),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || "Login failed");
  //     }

  //     return data;
  //   } catch (error) {
  //     throw new Error(error.message || "Network error occurred");
  //   }
  // },

  login: async (credentials) => {
    try {
      const response = await fetch(API_BASE_URL + "/v1/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save inspectorId into localStorage after successful login
      if (data.inspectorId) {
        localStorage.setItem("inspectorId", data.inspectorId);
      }

      return data; // return the response to the component as before
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  customerSignup: async (userData) => {
    try {
      let options = {
        method: "POST",
      };

      // If userData is FormData (files or not)
      if (userData instanceof FormData) {
        options.body = userData;
        // ❌ do not set Content-Type, fetch will set it with boundary automatically
      } else {
        // If it’s a plain object → send JSON
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(userData);
      }

      const response = await fetch(API_BASE_URL + "/v1/api/customers", options);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Customer signup failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  inspectorSignup: async (userData) => {
    try {
      const response = await fetch(
        API_BASE_URL + "/v1/api/inspector/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Inspector signup failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  companySignup: async (userData) => {
    try {
      const response = await fetch(API_BASE_URL + "/v1/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Company signup failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },

  getUserProfile: async (token) => {
    try {
      const response = await fetch(API_BASE_URL + "/v1/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get user profile");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Network error occurred");
    }
  },
};

// In your apiService file
getCustomerEnquiries: async (token) => {
  try {
    const response = await fetch(
      API_BASE_URL + "/v1/api/raiseenquiry/customer",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch enquiries");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Network error occurred");
  }
};

// Add this to your apiService object
submitEnquiry: async (enquiryData, token) => {
  console.log("API call started with data:", enquiryData); // Debug log

  try {
    const response = await fetch(API_BASE_URL + "/v1/api/raiseenquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(enquiryData),
    });

    console.log("Response status:", response.status); // Debug log

    const data = await response.json();
    console.log("Response data:", data); // Debug log

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit enquiry");
    }

    return data;
  } catch (error) {
    console.error("API call error:", error); // Debug log
    throw new Error(error.message || "Network error occurred");
  }
};
