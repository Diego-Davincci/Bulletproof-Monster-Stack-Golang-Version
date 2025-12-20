export const __prod__ = process.env.NODE_ENV === "production";

/**
 * A comprehensive collection of HTTP response status codes.
 * Grouped by category: 1xx, 2xx, 3xx, 4xx, 5xx.
 */
export const HTTP_STATUS = {
  // --- 1xx: Informational Responses ---
  CONTINUE: 100, // Client should continue with request
  SWITCHING_PROTOCOLS: 101, // Server is switching protocols (e.g., to WebSocket)
  PROCESSING: 102, // WebDAV; Server has received and is processing the request
  EARLY_HINTS: 103, // Used with Link header to allow browser to preload resources

  // --- 2xx: Success Responses ---
  OK: 200, // Request succeeded
  CREATED: 201, // Request succeeded and a new resource was created
  ACCEPTED: 202, // Request accepted for processing, but not yet complete
  NON_AUTHORITATIVE_INFORMATION: 203, // Meta-information is not from the origin server
  NO_CONTENT: 204, // Request succeeded but there is no content to send back
  RESET_CONTENT: 205, // Request succeeded, tell client to reset the document view
  PARTIAL_CONTENT: 206, // Used for multi-part/range headers (e.g., video streaming)
  MULTI_STATUS: 207, // WebDAV; message body is an XML message
  ALREADY_REPORTED: 208, // WebDAV; avoids multiple bindings to the same resource
  IM_USED: 226, // Server has fulfilled a GET request for the resource

  // --- 3xx: Redirection Responses ---
  MULTIPLE_CHOICES: 300, // Request has more than one possible response
  MOVED_PERMANENTLY: 301, // The URL of the requested resource has been changed permanently
  FOUND: 302, // The URL of the requested resource has been changed temporarily
  SEE_OTHER: 303, // Redirects client to get the requested resource at another URI with a GET request
  NOT_MODIFIED: 304, // Indicates that the resource has not been modified (for caching)
  USE_PROXY: 305, // (Deprecated) Requested resource must be accessed through the proxy
  TEMPORARY_REDIRECT: 307, // Sent to direct client to the requested resource at another URI (keeps method)
  PERMANENT_REDIRECT: 308, // The resource is now permanently located at another URI (keeps method)

  // --- 4xx: Client Error Responses ---
  BAD_REQUEST: 400, // Server cannot process request due to client error
  UNAUTHORIZED: 401, // Client must authenticate itself to get the response
  PAYMENT_REQUIRED: 402, // Reserved for future use (rarely used)
  FORBIDDEN: 403, // Client does not have access rights to the content
  NOT_FOUND: 404, // Server cannot find the requested resource
  METHOD_NOT_ALLOWED: 405, // Request method is known by server but not supported by the resource
  NOT_ACCEPTABLE: 406, // Server cannot produce a response matching the list of acceptable values
  PROXY_AUTHENTICATION_REQUIRED: 407, // Authentication is needed to be done by a proxy
  REQUEST_TIMEOUT: 408, // Server would like to shut down this unused connection
  CONFLICT: 409, // Request conflicts with the current state of the server
  GONE: 410, // Content has been permanently deleted from server
  LENGTH_REQUIRED: 411, // Server rejected request because Content-Length header is not defined
  PRECONDITION_FAILED: 412, // Client has put preconditions in its headers which the server does not meet
  PAYLOAD_TOO_LARGE: 413, // Request entity is larger than limits defined by server
  URI_TOO_LONG: 414, // URI requested by the client is longer than the server is willing to interpret
  UNSUPPORTED_MEDIA_TYPE: 415, // Media format of requested data is not supported by the server
  RANGE_NOT_SATISFIABLE: 416, // Range specified by Range header in request cannot be fulfilled
  EXPECTATION_FAILED: 417, // Expectation indicated by the Expect request-header field could not be met
  IM_A_TEAPOT: 418, // The server refuses the attempt to brew coffee with a teapot
  MISDIRECTED_REQUEST: 421, // Request was directed at a server that is not able to produce a response
  UNPROCESSABLE_ENTITY: 422, // WebDAV; request was well-formed but was unable to be followed due to semantic errors
  LOCKED: 423, // WebDAV; resource that is being accessed is locked
  FAILED_DEPENDENCY: 424, // WebDAV; request failed due to failure of a previous request
  TOO_EARLY: 425, // Server is unwilling to risk processing a request that might be replayed
  UPGRADE_REQUIRED: 426, // Server refuses to perform the request using the current protocol
  PRECONDITION_REQUIRED: 428, // Origin server requires the request to be conditional
  TOO_MANY_REQUESTS: 429, // User has sent too many requests in a given amount of time ("rate limiting")
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // Server is unwilling to process the request because its header fields are too large
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // User requests an illegal resource, such as a censored page

  // --- 5xx: Server Error Responses ---
  INTERNAL_SERVER_ERROR: 500, // Server encountered a situation it doesn't know how to handle
  NOT_IMPLEMENTED: 501, // Request method is not supported by the server and cannot be handled
  BAD_GATEWAY: 502, // Server, while acting as a gateway, got an invalid response
  SERVICE_UNAVAILABLE: 503, // Server is not ready to handle the request (e.g., maintenance/overload)
  GATEWAY_TIMEOUT: 504, // Server, while acting as a gateway, cannot get a response in time
  HTTP_VERSION_NOT_SUPPORTED: 505, // HTTP version used in the request is not supported by the server
  VARIANT_ALSO_NEGOTIATES: 506, // Server has an internal configuration error
  INSUFFICIENT_STORAGE: 507, // WebDAV; server is unable to store the representation needed to complete the request
  LOOP_DETECTED: 508, // WebDAV; server detected an infinite loop while processing the request
  NOT_EXTENDED: 510, // Further extensions to the request are required for the server to fulfill it
  NETWORK_AUTHENTICATION_REQUIRED: 511, // Client needs to authenticate to gain network access
};
