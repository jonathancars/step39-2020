import javax.servlet.http.HttpServletRequest;

import java.io.BufferedReader;
import java.lang.StringBuilder;
import java.io.IOException;

class ServletUtil {

  /*
   * Parses and returns the request body from the String. 
   */
  public static String getRequestBody(HttpServletRequest request) {
    StringBuilder sb = new StringBuilder();
    String reqString = "";
    String line;
    try {
      BufferedReader br = request.getReader();
      while ((line = br.readLine()) != null) {
        sb.append(line);
      }
    } catch (IOException e) {
      return null;
    }
    return sb.toString();
  }
}