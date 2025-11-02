export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blocks: {
        Row: {
          code: string
          created_at: string | null
          district_id: string
          id: string
          name: string
          updated_at: string | null
          villages_count: number | null
        }
        Insert: {
          code: string
          created_at?: string | null
          district_id: string
          id?: string
          name: string
          updated_at?: string | null
          villages_count?: number | null
        }
        Update: {
          code?: string
          created_at?: string | null
          district_id?: string
          id?: string
          name?: string
          updated_at?: string | null
          villages_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blocks_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          address: string | null
          age_months: number | null
          block_id: string | null
          condition: Database["public"]["Enums"]["child_condition"] | null
          contact_number: string | null
          created_at: string | null
          current_height: number | null
          current_weight: number | null
          date_of_birth: string
          district_id: string | null
          father_name: string | null
          full_name: string
          gender: string
          id: string
          identified_at: string | null
          identified_by: string | null
          mother_name: string | null
          muac: number | null
          registration_number: string
          updated_at: string | null
          village: string | null
        }
        Insert: {
          address?: string | null
          age_months?: number | null
          block_id?: string | null
          condition?: Database["public"]["Enums"]["child_condition"] | null
          contact_number?: string | null
          created_at?: string | null
          current_height?: number | null
          current_weight?: number | null
          date_of_birth: string
          district_id?: string | null
          father_name?: string | null
          full_name: string
          gender: string
          id?: string
          identified_at?: string | null
          identified_by?: string | null
          mother_name?: string | null
          muac?: number | null
          registration_number: string
          updated_at?: string | null
          village?: string | null
        }
        Update: {
          address?: string | null
          age_months?: number | null
          block_id?: string | null
          condition?: Database["public"]["Enums"]["child_condition"] | null
          contact_number?: string | null
          created_at?: string | null
          current_height?: number | null
          current_weight?: number | null
          date_of_birth?: string
          district_id?: string | null
          father_name?: string | null
          full_name?: string
          gender?: string
          id?: string
          identified_at?: string | null
          identified_by?: string | null
          mother_name?: string | null
          muac?: number | null
          registration_number?: string
          updated_at?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "children_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "children_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      districts: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
          population: number | null
          total_blocks: number | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
          population?: number | null
          total_blocks?: number | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
          population?: number | null
          total_blocks?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fund_allocations: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          block_id: string | null
          created_at: string | null
          created_by: string
          district_id: string | null
          fiscal_year: string
          from_entity: string
          id: string
          purpose: string
          quarter: string | null
          remarks: string | null
          status: Database["public"]["Enums"]["fund_status"] | null
          to_entity: string
          transaction_hash: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          block_id?: string | null
          created_at?: string | null
          created_by: string
          district_id?: string | null
          fiscal_year: string
          from_entity: string
          id?: string
          purpose: string
          quarter?: string | null
          remarks?: string | null
          status?: Database["public"]["Enums"]["fund_status"] | null
          to_entity: string
          transaction_hash?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          block_id?: string | null
          created_at?: string | null
          created_by?: string
          district_id?: string | null
          fiscal_year?: string
          from_entity?: string
          id?: string
          purpose?: string
          quarter?: string | null
          remarks?: string | null
          status?: Database["public"]["Enums"]["fund_status"] | null
          to_entity?: string
          transaction_hash?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fund_allocations_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fund_allocations_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      nrc_admissions: {
        Row: {
          admission_date: string | null
          admission_height: number | null
          admission_muac: number | null
          admission_number: string
          admission_weight: number
          admitted_by: string | null
          child_id: string
          complications: string | null
          created_at: string | null
          current_status: Database["public"]["Enums"]["admission_status"] | null
          days_in_treatment: number | null
          discharge_date: string | null
          discharged_by: string | null
          id: string
          nrc_center_id: string
          recovery_percentage: number | null
          target_weight: number | null
          updated_at: string | null
        }
        Insert: {
          admission_date?: string | null
          admission_height?: number | null
          admission_muac?: number | null
          admission_number: string
          admission_weight: number
          admitted_by?: string | null
          child_id: string
          complications?: string | null
          created_at?: string | null
          current_status?:
            | Database["public"]["Enums"]["admission_status"]
            | null
          days_in_treatment?: number | null
          discharge_date?: string | null
          discharged_by?: string | null
          id?: string
          nrc_center_id: string
          recovery_percentage?: number | null
          target_weight?: number | null
          updated_at?: string | null
        }
        Update: {
          admission_date?: string | null
          admission_height?: number | null
          admission_muac?: number | null
          admission_number?: string
          admission_weight?: number
          admitted_by?: string | null
          child_id?: string
          complications?: string | null
          created_at?: string | null
          current_status?:
            | Database["public"]["Enums"]["admission_status"]
            | null
          days_in_treatment?: number | null
          discharge_date?: string | null
          discharged_by?: string | null
          id?: string
          nrc_center_id?: string
          recovery_percentage?: number | null
          target_weight?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nrc_admissions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nrc_admissions_nrc_center_id_fkey"
            columns: ["nrc_center_id"]
            isOneToOne: false
            referencedRelation: "nrc_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      nrc_centers: {
        Row: {
          bed_capacity: number | null
          block_id: string | null
          code: string
          contact_person: string | null
          created_at: string | null
          current_occupancy: number | null
          district_id: string | null
          id: string
          name: string
          phone: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bed_capacity?: number | null
          block_id?: string | null
          code: string
          contact_person?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          district_id?: string | null
          id?: string
          name: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bed_capacity?: number | null
          block_id?: string | null
          code?: string
          contact_person?: string | null
          created_at?: string | null
          current_occupancy?: number | null
          district_id?: string | null
          id?: string
          name?: string
          phone?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nrc_centers_block_id_fkey"
            columns: ["block_id"]
            isOneToOne: false
            referencedRelation: "blocks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nrc_centers_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          block: string | null
          created_at: string | null
          department: string | null
          designation: string | null
          district: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          block?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          district?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          block?: string | null
          created_at?: string | null
          department?: string | null
          designation?: string | null
          district?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      treatment_plans: {
        Row: {
          admission_id: string
          created_at: string | null
          created_by: string | null
          diet_plan: string | null
          id: string
          interventions: string | null
          medicines: string | null
          monitoring_notes: string | null
          plan_date: string | null
          updated_at: string | null
          weight_recorded: number | null
        }
        Insert: {
          admission_id: string
          created_at?: string | null
          created_by?: string | null
          diet_plan?: string | null
          id?: string
          interventions?: string | null
          medicines?: string | null
          monitoring_notes?: string | null
          plan_date?: string | null
          updated_at?: string | null
          weight_recorded?: number | null
        }
        Update: {
          admission_id?: string
          created_at?: string | null
          created_by?: string | null
          diet_plan?: string | null
          id?: string
          interventions?: string | null
          medicines?: string | null
          monitoring_notes?: string | null
          plan_date?: string | null
          updated_at?: string | null
          weight_recorded?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "treatment_plans_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "nrc_admissions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      admission_status: "active" | "discharged" | "referred" | "follow_up"
      app_role:
        | "admin"
        | "district"
        | "block"
        | "supervisor"
        | "teacher"
        | "nrc"
        | "public"
      child_condition:
        | "critical"
        | "severe"
        | "moderate"
        | "improving"
        | "recovered"
      fund_status:
        | "pending"
        | "approved"
        | "transferred"
        | "utilized"
        | "audited"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admission_status: ["active", "discharged", "referred", "follow_up"],
      app_role: [
        "admin",
        "district",
        "block",
        "supervisor",
        "teacher",
        "nrc",
        "public",
      ],
      child_condition: [
        "critical",
        "severe",
        "moderate",
        "improving",
        "recovered",
      ],
      fund_status: [
        "pending",
        "approved",
        "transferred",
        "utilized",
        "audited",
      ],
    },
  },
} as const
