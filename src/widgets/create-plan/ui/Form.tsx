/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Form() {
  const form = useForm();
}

const formSchema = z.object({});
