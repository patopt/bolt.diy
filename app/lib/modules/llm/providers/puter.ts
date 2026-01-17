type: new file
fileName: patopt/bolt.diy/bolt.diy-3f6050b227644834130790c5d1664607c1df5a15/app/lib/modules/llm/providers/puter.ts
fullContent:
import { BaseProvider } from '~/lib/modules/llm/base-provider';
import type { ModelInfo } from '~/lib/modules/llm/types';
import type { IProviderSetting } from '~/types/model';
import type { LanguageModelV1 } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export default class PuterProvider extends BaseProvider {
  name = 'Puter';
  getApiKeyLink = 'https://puter.com';

  config = {
    apiTokenKey: 'PUTER_API_KEY',
    baseUrlKey: 'PUTER_BASE_URL',
  };

  staticModels: ModelInfo[] = [
    // --- Modèles OpenAI (Source: Free, Unlimited OpenAI API.pdf) ---
    {
      name: 'gpt-5.2',
      label: 'GPT-5.2 (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-5.1',
      label: 'GPT-5.1 (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-5',
      label: 'GPT-5 (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-4.5-preview',
      label: 'GPT-4.5 Preview (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-4.1',
      label: 'GPT-4.1 (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-4o',
      label: 'GPT-4o (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'gpt-4o-mini',
      label: 'GPT-4o Mini (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'o1-preview',
      label: 'o1 Preview (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    {
      name: 'o1-mini',
      label: 'o1 Mini (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 128000,
    },
    
    // --- Modèles Gemini (Source: Free, Unlimited Gemini API.pdf) ---
    {
      name: 'gemini-3-flash-preview',
      label: 'Gemini 3 Flash Preview (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 1000000,
    },
    {
      name: 'gemini-3-pro-preview',
      label: 'Gemini 3 Pro Preview (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 2000000,
    },
    {
      name: 'gemini-2.5-pro',
      label: 'Gemini 2.5 Pro (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 2000000,
    },
    {
      name: 'gemini-2.5-flash',
      label: 'Gemini 2.5 Flash (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 1000000,
    },
    {
      name: 'gemini-2.5-flash-lite',
      label: 'Gemini 2.5 Flash Lite (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 1000000,
    },
    {
      name: 'gemini-2.0-flash',
      label: 'Gemini 2.0 Flash (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 1000000,
    },
    {
      name: 'gemini-1.5-flash',
      label: 'Gemini 1.5 Flash (Puter)',
      provider: 'Puter',
      maxTokenAllowed: 1000000,
    },
  ];

  getModelInstance(options: {
    model: string;
    serverEnv: Env;
    apiKeys?: Record<string, string>;
    providerSettings?: Record<string, IProviderSetting>;
  }): LanguageModelV1 {
    const { model, serverEnv, apiKeys, providerSettings } = options;

    const { apiKey, baseUrl } = this.getProviderBaseUrlAndKey({
      apiKeys,
      providerSettings: providerSettings?.[this.name],
      serverEnv: serverEnv as any,
      defaultBaseUrlKey: 'PUTER_BASE_URL',
      defaultApiTokenKey: 'PUTER_API_KEY',
    });

    // Configuration pour utiliser un endpoint compatible OpenAI (ex: un proxy local pour Puter.js)
    const openai = createOpenAI({
      apiKey: apiKey || 'no-key-required', // Puter ne demande généralement pas de clé, mais le SDK peut en attendre une
      baseURL: baseUrl || 'http://localhost:1862/v1', // Port par défaut souvent utilisé par les wrappers Node.js pour Puter
    });

    return openai(model);
  }
}