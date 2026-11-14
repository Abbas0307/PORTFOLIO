const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== 'undefined' && window.location.hostname) {
    return `http://${window.location.hostname}:8000`;
  }
  return 'http://127.0.0.1:8000';
};

const API_BASE_URL = getApiBaseUrl();

export interface ContactFormData {
  full_name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject: string;
  message: string;
  honeypot?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  enquiry_id: string;
}

export interface EnquiryItem {
  id: number;
  enquiry_id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  organization?: string | null;
  subject: string;
  message: string;
  status: 'New' | 'Read' | 'Replied' | 'Archived';
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface EnquiryStats {
  total: number;
  new: number;
  read: number;
  replied: number;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  username: string;
}

class ApiService {
  private getHeaders(token?: string | null): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async checkHealth(): Promise<{ status: string }> {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return res.json();
  }

  async submitContact(data: ContactFormData): Promise<ContactResponse> {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to submit contact enquiry');
    }
    return result;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Invalid username or password');
    }
    return result;
  }

  async getStats(token: string): Promise<EnquiryStats> {
    const res = await fetch(`${API_BASE_URL}/api/admin/stats`, {
      headers: this.getHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to fetch enquiry statistics');
    }
    return result;
  }

  async getEnquiries(
    token: string,
    params?: { search?: string; status?: string; sort_order?: string }
  ): Promise<EnquiryItem[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.sort_order) query.append('sort_order', params.sort_order);

    const url = `${API_BASE_URL}/api/admin/enquiries${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url, {
      headers: this.getHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to fetch enquiries');
    }
    return result;
  }

  async getEnquiry(token: string, id: string | number): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE_URL}/api/admin/enquiries/${id}`, {
      headers: this.getHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to retrieve enquiry');
    }
    return result;
  }

  async updateEnquiry(
    token: string,
    id: string | number,
    data: { status?: string; admin_notes?: string }
  ): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE_URL}/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: this.getHeaders(token),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to update enquiry');
    }
    return result;
  }

  async deleteEnquiry(token: string, id: string | number): Promise<{ message: string; deleted: boolean }> {
    const res = await fetch(`${API_BASE_URL}/api/admin/enquiries/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(token),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.detail || 'Failed to delete enquiry');
    }
    return result;
  }
}

export const apiService = new ApiService();
