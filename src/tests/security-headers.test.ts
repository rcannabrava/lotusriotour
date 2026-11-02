import { describe, expect, it } from "vitest";
import { buildCsp, SECURITY_HEADERS, withSecurityHeaders } from "@/lib/security-headers";

describe("security headers", () => {
  it("adds every header to a response", () => {
    const response = withSecurityHeaders(new Response("<html></html>", { status: 200 }));
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      expect(response.headers.get(name)).toBe(value);
    }
  });

  it("keeps the status, body and existing headers", async () => {
    const original = new Response("not found", {
      status: 404,
      headers: { "content-type": "text/plain", "X-Frame-Options": "SAMEORIGIN" },
    });
    const response = withSecurityHeaders(original);
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/plain");
    expect(response.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
    expect(await response.text()).toBe("not found");
  });

  it("works on responses with immutable headers", () => {
    const immutable = Response.redirect("https://lotusriotour.com/", 301);
    const response = withSecurityHeaders(immutable);
    expect(response.status).toBe(301);
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("locks down framing, plugins and the base URL", () => {
    const csp = buildCsp();
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("default-src 'self'");
  });

  it("allows the third parties the site loads", () => {
    const csp = buildCsp();
    expect(csp).toMatch(/script-src [^;]*https:\/\/www\.googletagmanager\.com/);
    expect(csp).toMatch(/style-src [^;]*https:\/\/fonts\.googleapis\.com/);
    expect(csp).toMatch(/font-src [^;]*https:\/\/fonts\.gstatic\.com/);
    expect(csp).toMatch(/img-src [^;]*https:\/\/cdn\.trustindex\.io/);
  });
});
