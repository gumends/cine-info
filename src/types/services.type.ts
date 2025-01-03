export interface IService {
    id: number;
    results: {
        [countryCode: string]: {
            link: string;
            rent?: {
                logo_path: string;
                provider_id: number;
                provider_name: string;
                display_priority: number;
            }[];
            flatrate?: {
                logo_path: string;
                provider_id: number;
                provider_name: string;
                display_priority: number;
            }[];
            buy?: {
                logo_path: string;
                provider_id: number;
                provider_name: string;
                display_priority: number;
            }[];
        };
    };
}
