/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

// Payment record interface
interface PaymentRecord {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: 'Pago' | 'Pendente';
}

// Student Data Interface
interface Student {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  photo?: string;
  guardian: string;
  guardianRole?: string;
  guardianPhone?: string;
  guardianPhoto?: string;
  email?: string;
  rg?: string;
  cpf?: string;
  birthDate?: string;
  schoolGrade?: string;
  schoolName?: string;
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  plan: string;
  planPrice?: string;
  planBadgeType: 'orange' | 'gray';
  status: 'Ativo' | 'Inativo';
  grade?: string;
  shift?: string;
  joinedDate?: string;
  renewalDate?: string;
  paymentHistory?: PaymentRecord[];
}

interface ResponsibleOption {
  id: string;
  name: string;
  role: string;
  phone: string;
  photo?: string;
  cpf?: string;
  rg?: string;
  email?: string;
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

// Lista de responsáveis inicia vazia - preenchida apenas pelos cadastrados pelo usuário
const INITIAL_RESPONSIBLES: ResponsibleOption[] = [];

const INITIAL_STUDENTS: Student[] = [
  {
    id: '2024-0891',
    name: 'Arthur Meireles',
    initials: 'AM',
    avatarBg: 'bg-[#d0e4ff]',
    avatarText: 'text-[#00629f]',
    guardian: 'Clara Meireles',
    guardianRole: 'Mãe • Principal',
    guardianPhone: '(11) 98765-4321',
    email: 'arthur.meireles@email.com',
    address: 'Rua das Palmeiras, 150 - 42',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    plan: 'Trimestral',
    planPrice: 'R$ 890,00',
    planBadgeType: 'orange',
    status: 'Ativo',
    grade: '5º Ano - Ensino Fundamental',
    shift: 'Tarde (14h - 17h)',
    joinedDate: '12/01/2024',
    renewalDate: '12/04/2024',
    paymentHistory: [
      { id: '1', description: 'Mensalidade Abril', date: '10/04/2024', amount: 'R$ 890,00', status: 'Pago' },
      { id: '2', description: 'Mensalidade Maio', date: '10/05/2024', amount: 'R$ 890,00', status: 'Pendente' },
    ],
  },
  {
    id: '4530',
    name: 'Beatriz Cavalcanti',
    initials: 'BC',
    avatarBg: 'bg-[#6ff7ee]/50',
    avatarText: 'text-[#00504c]',
    guardian: 'Ricardo Cavalcanti',
    guardianRole: 'Pai • Principal',
    guardianPhone: '(11) 99123-8844',
    email: 'beatriz.cavalcanti@email.com',
    address: 'Av. Paulista, 1000 - Ap 81',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    plan: 'Plano Mensal',
    planPrice: 'R$ 650,00',
    planBadgeType: 'gray',
    status: 'Ativo',
    grade: '7º Ano - Ensino Fundamental',
    shift: 'Manhã (09h - 11h30)',
    joinedDate: '01/03/2024',
    renewalDate: '01/04/2024',
    paymentHistory: [
      { id: '1', description: 'Mensalidade Abril', date: '05/04/2024', amount: 'R$ 650,00', status: 'Pago' },
    ],
  },
  {
    id: '4412',
    name: 'Gabriel Souza',
    initials: 'GS',
    avatarBg: 'bg-[#ffdad6]',
    avatarText: 'text-[#ba1a1a]',
    guardian: 'Mariana Souza',
    guardianRole: 'Mãe • Principal',
    guardianPhone: '(11) 97654-1122',
    email: 'gabriel.souza@email.com',
    address: 'Rua Vergueiro, 780',
    neighborhood: 'Liberdade',
    city: 'São Paulo',
    plan: 'Particular',
    planPrice: 'R$ 450,00',
    planBadgeType: 'gray',
    status: 'Inativo',
    grade: '3º Ano - Ensino Médio',
    shift: 'Sábados (10h - 12h)',
    joinedDate: '10/08/2023',
    renewalDate: '10/09/2023',
    paymentHistory: [
      { id: '1', description: 'Aula Particular Agosto', date: '10/08/2023', amount: 'R$ 450,00', status: 'Pago' },
    ],
  },
  {
    id: '4566',
    name: 'Luiza Lima',
    initials: 'LL',
    avatarBg: 'bg-[#d0e4ff]',
    avatarText: 'text-[#00629f]',
    guardian: 'Sonia Lima',
    guardianRole: 'Mãe • Principal',
    guardianPhone: '(11) 98234-7711',
    email: 'luiza.lima@email.com',
    address: 'Rua Domingos de Morais, 2100',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    plan: 'Trimestral (Atelier)',
    planPrice: 'R$ 890,00',
    planBadgeType: 'orange',
    status: 'Ativo',
    grade: '4º Ano - Ensino Fundamental',
    shift: 'Tarde (14h - 17h)',
    joinedDate: '12/04/2024',
    renewalDate: '12/07/2024',
    paymentHistory: [
      { id: '1', description: 'Mensalidade Abril', date: '12/04/2024', amount: 'R$ 890,00', status: 'Pago' },
    ],
  },
  {
    id: '4570',
    name: 'Mateus Fontana',
    initials: 'MF',
    avatarBg: 'bg-[#6ff7ee]/50',
    avatarText: 'text-[#00504c]',
    guardian: 'Mateus Fontana', // Titular da conta! Aluno é o próprio responsável financeiro
    guardianRole: 'Titular da Conta',
    guardianPhone: '(11) 99432-5566',
    email: 'mateus.fontana@email.com',
    address: 'Rua das Palmeiras, 150 - 42',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    plan: 'Mensal (Atelier)',
    planPrice: 'R$ 890,00',
    planBadgeType: 'orange',
    status: 'Ativo',
    grade: '6º Ano - Ensino Fundamental',
    shift: 'Manhã (08h30 - 11h)',
    joinedDate: '12/01/2024',
    renewalDate: '12/04/2024',
    paymentHistory: [
      { id: '1', description: 'Mensalidade Abril', date: '10/04/2024', amount: 'R$ 890,00', status: 'Pago' },
      { id: '2', description: 'Mensalidade Maio', date: '10/05/2024', amount: 'R$ 890,00', status: 'Pendente' },
    ],
  },
];

type NavItemKey =
  | 'dashboard'
  | 'alunos'
  | 'agenda'
  | 'financeiro'
  | 'responsaveis'
  | 'professores'
  | 'disciplinas'
  | 'questionarios'
  | 'planos';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItemKey>('alunos');
  // currentScreen: 'list' (Base de Alunos) | 'create' (Cadastro de Novo Aluno) | 'create-responsible' (Cadastro de Responsável - image_48875ef4.png)
  const [currentScreen, setCurrentScreen] = useState<'list' | 'create' | 'create-responsible'>('list');
  const [previousScreen, setPreviousScreen] = useState<'list' | 'create'>('create');

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [responsibles, setResponsibles] = useState<ResponsibleOption[]>(INITIAL_RESPONSIBLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('Todos os Planos');
  const [statusFilter, setStatusFilter] = useState<'Todos' | 'Ativo' | 'Inativo'>('Todos');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal 1: Aluno é o próprio responsável financeiro (image_5fab6e0a.png)
  const [selfResponsibleStudent, setSelfResponsibleStudent] = useState<Student | null>(null);
  const [selfResponsibleFormData, setSelfResponsibleFormData] = useState<Student | null>(null);

  // Modal 2: Aluno não é o responsável financeiro (image_12e24385.png)
  const [dependentStudent, setDependentStudent] = useState<Student | null>(null);
  const [dependentFormData, setDependentFormData] = useState<Student | null>(null);

  // Estado do formulário da nova tela de cadastro (image_a58c25de.png)
  const [createForm, setCreateForm] = useState({
    name: '',
    birthDate: '',
    rg: '',
    cpf: '',
    phone: '',
    schoolGrade: 'Ensino Fundamental I',
    schoolName: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    state: 'São Paulo',
    city: 'São Paulo',
    selectedResponsibleId: '', // Apenas os cadastrados pelo usuário no botão "Criar Novo Responsável"
    selectedPlan: 'Atelier Total', // Recomendado selecionado por padrão como na imagem
    photo: '',
    responsibleSearch: '',
  });

  // Estado para cadastro de novo responsável (tela image_48875ef4.png)
  const [newRespForm, setNewRespForm] = useState({
    name: '',
    photo: '',
    cpf: '',
    rg: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper: verifica se o aluno é o próprio responsável financeiro
  const isStudentSelfGuardian = (student: Student) => {
    if (!student.name || !student.guardian) return false;
    return student.name.trim().toLowerCase() === student.guardian.trim().toLowerCase();
  };

  // Handler ao clicar no nome do aluno ou no botão de visualizar perfil
  const handleStudentNameClick = (student: Student) => {
    if (isStudentSelfGuardian(student)) {
      setSelfResponsibleStudent(student);
      setSelfResponsibleFormData({ ...student });
      setDependentStudent(null);
    } else {
      setDependentStudent(student);
      setDependentFormData({ ...student });
      setSelfResponsibleStudent(null);
    }
  };

  // Objeto do responsável selecionado no cadastro
  const selectedResponsible = useMemo(() => {
    if (!createForm.selectedResponsibleId) {
      return responsibles.length > 0 ? responsibles[0] : null;
    }
    return responsibles.find((r) => r.id === createForm.selectedResponsibleId) || null;
  }, [responsibles, createForm.selectedResponsibleId]);

  // Handler para salvar novo responsável cadastrado na tela dedicada (image_48875ef4.png)
  const handleSaveResponsibleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRespForm.name.trim()) {
      showToast('Por favor, informe o nome do responsável.');
      return;
    }

    const newResp: ResponsibleOption = {
      id: `resp-${Date.now()}`,
      name: newRespForm.name.trim(),
      role: 'Responsável',
      phone: newRespForm.phone.trim() || '(11) 98877-6655',
      photo: newRespForm.photo || '',
      cpf: newRespForm.cpf,
      rg: newRespForm.rg,
      email: newRespForm.email,
      cep: newRespForm.cep,
      address: newRespForm.address,
      number: newRespForm.number,
      complement: newRespForm.complement,
      neighborhood: newRespForm.neighborhood,
      city: newRespForm.city,
      state: newRespForm.state,
    };

    setResponsibles((prev) => [newResp, ...prev]);
    setCreateForm((prev) => ({
      ...prev,
      selectedResponsibleId: newResp.id,
    }));

    setNewRespForm({
      name: '',
      photo: '',
      cpf: '',
      rg: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    });

    showToast(`Responsável "${newResp.name}" cadastrado e vinculado!`);
    setActiveNav('alunos');
    setCurrentScreen(previousScreen);
  };

  // Preço calculado do plano selecionado
  const selectedPlanPrice = useMemo(() => {
    if (createForm.selectedPlan === 'Atelier 2×') return 'R$ 450,00';
    if (createForm.selectedPlan === 'Atelier Total') return 'R$ 890,00';
    return 'Consultar';
  }, [createForm.selectedPlan]);

  // Filter students based on search term, plan filter, and status filter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.guardian.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.includes(searchTerm);

      const matchesPlan =
        selectedPlanFilter === 'Todos os Planos' ||
        (selectedPlanFilter === 'Pacote Mensal' && student.plan.includes('Mensal')) ||
        (selectedPlanFilter === 'Pacote Trimestral' && student.plan.includes('Trimestral')) ||
        (selectedPlanFilter === 'Aula Particular' && student.plan.includes('Particular')) ||
        (selectedPlanFilter === 'Atelier' && student.plan.includes('Atelier')) ||
        student.plan.toLowerCase().includes(selectedPlanFilter.toLowerCase());

      const matchesStatus = statusFilter === 'Todos' || student.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [students, searchTerm, selectedPlanFilter, statusFilter]);

  // Submissão do Formulário de Cadastro de Novo Aluno (image_a58c25de.png)
  const handleFinalizeCadastro = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedResponsible && responsibles.length === 0) {
      showToast('Por favor, cadastre um responsável no botão "Criar Novo Responsável" antes de finalizar.');
      return;
    }

    const finalName = createForm.name.trim() || 'Arthur Cavalcanti Silva';

    const names = finalName.split(' ');
    const initials =
      names.length > 1
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0].slice(0, 2).toUpperCase();

    const newId = `2024-0${Math.floor(890 + Math.random() * 100)}`;
    const isAtelierOrTrimestral =
      createForm.selectedPlan.includes('Atelier') || createForm.selectedPlan.includes('Trimestral');

    const createdStudent: Student = {
      id: newId,
      name: finalName,
      initials,
      avatarBg: 'bg-[#d0e4ff]',
      avatarText: 'text-[#00629f]',
      photo: createForm.photo || undefined,
      guardian: selectedResponsible ? selectedResponsible.name : finalName,
      guardianRole: selectedResponsible
        ? `${selectedResponsible.role} • Principal`
        : 'Titular da Conta',
      guardianPhoto: selectedResponsible?.photo,
      guardianPhone:
        selectedResponsible?.phone || createForm.phone || '(11) 98877-6655',
      email: `${finalName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      rg: createForm.rg || '00.000.000-0',
      cpf: createForm.cpf || '000.000.000-0',
      birthDate: createForm.birthDate || '10/05/2012',
      schoolGrade: createForm.schoolGrade,
      schoolName: createForm.schoolName || 'Escola Estadual São Paulo',
      cep: createForm.cep || '01000-000',
      address:
        createForm.address ||
        (createForm.number ? `Rua das Flores, ${createForm.number}` : 'Rua das Flores, 123'),
      number: createForm.number || '123',
      complement: createForm.complement || 'Apto 42',
      neighborhood: createForm.neighborhood || 'Centro',
      city: createForm.city || 'São Paulo',
      state: createForm.state || 'São Paulo',
      plan: createForm.selectedPlan,
      planPrice: selectedPlanPrice,
      planBadgeType: isAtelierOrTrimestral ? 'orange' : 'gray',
      status: 'Ativo',
      grade: createForm.schoolGrade,
      shift: 'Tarde (14h - 17h)',
      joinedDate: '12/01/2024',
      renewalDate: '12/04/2024',
      paymentHistory: [
        {
          id: '1',
          description: 'Mensalidade Abril',
          date: '10/04/2024',
          amount: selectedPlanPrice !== 'Consultar' ? selectedPlanPrice : 'R$ 890,00',
          status: 'Pago',
        },
        {
          id: '2',
          description: 'Mensalidade Maio',
          date: '10/05/2024',
          amount: selectedPlanPrice !== 'Consultar' ? selectedPlanPrice : 'R$ 890,00',
          status: 'Pendente',
        },
      ],
    };

    // Insere o aluno criado no topo da lista
    setStudents([createdStudent, ...students]);
    // Volta para a tela da lista de alunos
    setCurrentScreen('list');
    showToast(`Aluno ${createdStudent.name} cadastrado com sucesso!`);
  };

  // Salvar alterações no Modal do Aluno Titular (image_5fab6e0a.png)
  const handleSaveSelfResponsibleChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selfResponsibleFormData) return;

    setStudents((prev) =>
      prev.map((s) => (s.id === selfResponsibleFormData.id ? selfResponsibleFormData : s))
    );
    showToast(`Alterações do aluno ${selfResponsibleFormData.name} salvas com sucesso!`);
    setSelfResponsibleStudent(null);
    setSelfResponsibleFormData(null);
  };

  // Salvar alterações no Modal do Aluno Dependente (image_12e24385.png)
  const handleSaveDependentChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dependentFormData) return;

    setStudents((prev) =>
      prev.map((s) => (s.id === dependentFormData.id ? dependentFormData : s))
    );
    showToast(`Alterações do aluno ${dependentFormData.name} salvas com sucesso!`);
    setDependentStudent(null);
    setDependentFormData(null);
  };

  // Handle update student (modo edição básico)
  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const isAtelierOrTrimestral =
      editingStudent.plan.includes('Trimestral') || editingStudent.plan.includes('Atelier');

    const updatedStudents = students.map((s) =>
      s.id === editingStudent.id
        ? {
            ...editingStudent,
            planBadgeType: isAtelierOrTrimestral ? ('orange' as const) : ('gray' as const),
          }
        : s
    );

    setStudents(updatedStudents);
    setEditingStudent(null);
    showToast(`Dados de ${editingStudent.name} atualizados com sucesso!`);
  };

  // Handle delete
  const confirmDeleteStudent = () => {
    if (!studentToDelete) return;
    setStudents(students.filter((s) => s.id !== studentToDelete.id));
    showToast(`Aluno ${studentToDelete.name} removido.`);
    setStudentToDelete(null);
  };

  return (
    <div className="bg-[#fbf9f8] text-[#1b1c1c] min-h-screen flex selection:bg-[#ffdbcb] selection:text-[#783100] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#1b1c1c] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in border border-[#f2711c]/30">
          <span className="material-symbols-outlined text-[#f2711c] text-xl">check_circle</span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* SideNavBar Navigation Shell */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-[#f5f3f3] p-4 gap-2 font-['Plus_Jakarta_Sans'] text-sm font-medium border-r border-[#dfc0b2]/20">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="w-10 h-10 rounded-xl bg-[#f2711c] flex items-center justify-center text-white shadow-md shadow-[#f2711c]/20">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
          </div>
          <div>
            <h1 className="text-lg font-black text-[#9e4300] tracking-tight leading-tight">
              Espaço Lição de Casa
            </h1>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto pr-1">
          <button
            onClick={() => {
              setActiveNav('dashboard');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'dashboard'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{
                fontVariationSettings: activeNav === 'dashboard' ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              dashboard
            </span>
            Dashboard
          </button>

          <button
            onClick={() => {
              setActiveNav('alunos');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left ${
              activeNav === 'alunos'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{
                fontVariationSettings: "'FILL' 1",
              }}
            >
              group
            </span>
            Alunos
          </button>

          <button
            onClick={() => {
              setActiveNav('agenda');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'agenda'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            Agenda
          </button>

          <button
            onClick={() => {
              setActiveNav('financeiro');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'financeiro'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">payments</span>
            Financeiro
          </button>

          <button
            onClick={() => {
              setActiveNav('responsaveis');
              setPreviousScreen(currentScreen === 'create-responsible' ? 'list' : currentScreen);
              setCurrentScreen('create-responsible');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'responsaveis' || currentScreen === 'create-responsible'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">supervisor_account</span>
            Responsáveis
          </button>

          <button
            onClick={() => {
              setActiveNav('professores');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'professores'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">school</span>
            Professores
          </button>

          <button
            onClick={() => {
              setActiveNav('disciplinas');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'disciplinas'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">menu_book</span>
            Disciplinas
          </button>

          <button
            onClick={() => {
              setActiveNav('questionarios');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'questionarios'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">quiz</span>
            Questionários
          </button>

          <button
            onClick={() => {
              setActiveNav('planos');
              setCurrentScreen('list');
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-150 text-left font-medium ${
              activeNav === 'planos'
                ? 'bg-white text-[#f2711c] font-bold shadow-sm'
                : 'text-[#584237] hover:bg-[#e4e2e2] active:translate-x-1'
            }`}
          >
            <span className="material-symbols-outlined text-xl">assignment</span>
            Planos
          </button>
        </nav>

        {/* Footer Admin User */}
        <div className="pt-4 border-t border-[#dfc0b2]/20 flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center font-bold text-xs shrink-0">
            <span className="material-symbols-outlined text-lg">person</span>
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-[#1b1c1c]">Admin User</p>
            <p className="text-[10px] text-[#584237]/70">Diretoria</p>
          </div>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 min-h-screen relative flex flex-col pb-24 md:pb-8">
        {/* TopAppBar Header Shell */}
        <header className="bg-[#fbf9f8]/85 backdrop-blur-xl sticky top-0 z-40 flex justify-between items-center w-full px-6 md:px-8 py-4 shadow-[0_16px_32px_-12px_rgba(242,113,28,0.06)] border-b border-[#f0eded]">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-lg md:text-xl text-[#1b1c1c] tracking-tight">
              {currentScreen === 'create-responsible'
                ? 'Cadastro de Responsável'
                : currentScreen === 'create'
                ? 'Cadastro de Novo Aluno'
                : 'Espaço Lição de Casa'}
            </h2>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            {/* Header Search Input */}
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder={
                  currentScreen === 'create-responsible'
                    ? 'Buscar no sistema...'
                    : 'Buscar aluno...'
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#f0eded] rounded-full text-xs font-medium text-[#1b1c1c] outline-none w-44 md:w-56 focus:bg-white focus:ring-2 focus:ring-[#9e4300]/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => showToast('Você não possui novas notificações.')}
                className="p-2.5 text-[#584237] hover:bg-[#f5f3f3] rounded-full transition-colors active:scale-95 relative cursor-pointer"
                title="Notificações"
              >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#f2711c]"></span>
              </button>
              <button
                onClick={() => showToast('Configurações do sistema')}
                className="p-2.5 text-[#584237] hover:bg-[#f5f3f3] rounded-full transition-colors active:scale-95 cursor-pointer"
                title="Configurações"
              >
                <span className="material-symbols-outlined text-2xl">settings</span>
              </button>
            </div>
            {/* User Profile Avatar */}
            <div
              className="h-10 w-10 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center ring-2 ring-[#ffdbcb] cursor-pointer hover:ring-[#f2711c] transition-all shadow-sm"
              title="Coordenador Pedagógico"
              onClick={() => showToast('Perfil do Coordenador Pedagógico')}
            >
              <span className="material-symbols-outlined text-2xl">account_circle</span>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* TELA DE CADASTRO DE RESPONSÁVEL (EXATAMENTE IGUAL À IMAGEM image_48875ef4.png) */}
        {/* ========================================================================= */}
        {currentScreen === 'create-responsible' ? (
          <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full flex flex-col gap-6 animate-fade-in">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#584237]/70">
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('alunos');
                    setCurrentScreen('list');
                  }}
                  className="hover:text-[#9e4300] hover:underline cursor-pointer"
                >
                  Dashboard
                </button>
                <span>›</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('responsaveis');
                    setCurrentScreen('create-responsible');
                  }}
                  className="hover:text-[#9e4300] hover:underline cursor-pointer"
                >
                  Responsáveis
                </button>
                <span>›</span>
                <span className="text-[#9e4300] font-bold">Novo Cadastro</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveNav('alunos');
                  setCurrentScreen(previousScreen);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#584237] hover:text-[#9e4300] bg-white px-3.5 py-1.5 rounded-full border border-[#f0eded] shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Voltar</span>
              </button>
            </div>

            {/* Formulário de Cadastro de Responsável */}
            <form onSubmit={handleSaveResponsibleCadastro} className="flex flex-col gap-6">
              {/* CARD 1: Dados Pessoais */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                {/* Cabeçalho do Card */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                    Dados Pessoais
                  </h3>
                </div>

                {/* Seção Foto / Ícone do Responsável */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center overflow-hidden shadow-sm">
                      <span className="material-symbols-outlined text-3xl sm:text-4xl">
                        person
                      </span>
                    </div>
                    <div
                      className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#9e4300] text-white flex items-center justify-center shadow-md"
                      title="Ícone do perfil"
                    >
                      <span className="material-symbols-outlined text-xs">account_circle</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs sm:text-sm text-[#584237]/80 leading-relaxed max-w-xl">
                      Ícone de identificação do responsável no sistema.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#f0eded] text-[11px] font-bold text-[#584237]">
                        Ícone Padrão
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={newRespForm.name}
                    onChange={(e) => setNewRespForm({ ...newRespForm, name: e.target.value })}
                    placeholder="Digite o nome completo"
                    className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                  />
                </div>

                {/* CPF e RG */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">CPF</label>
                    <input
                      type="text"
                      value={newRespForm.cpf}
                      onChange={(e) => setNewRespForm({ ...newRespForm, cpf: e.target.value })}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">RG</label>
                    <input
                      type="text"
                      value={newRespForm.rg}
                      onChange={(e) => setNewRespForm({ ...newRespForm, rg: e.target.value })}
                      placeholder="00.000.000-0"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>
                </div>

                {/* E-mail e Telefone Celular */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">E-mail</label>
                    <input
                      type="email"
                      value={newRespForm.email}
                      onChange={(e) => setNewRespForm({ ...newRespForm, email: e.target.value })}
                      placeholder="email@exemplo.com"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Telefone Celular
                    </label>
                    <input
                      type="text"
                      required
                      value={newRespForm.phone}
                      onChange={(e) => setNewRespForm({ ...newRespForm, phone: e.target.value })}
                      placeholder="(00) 00000-0000"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: Endereço */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                {/* Cabeçalho do Card */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d0e4ff] text-[#00629f] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">location_on</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                    Endereço
                  </h3>
                </div>

                {/* CEP e Logradouro */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">CEP</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={newRespForm.cep}
                        onChange={(e) => setNewRespForm({ ...newRespForm, cep: e.target.value })}
                        placeholder="00000-000"
                        className="w-full pl-4 pr-10 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => showToast('Buscando CEP...')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#783100] hover:text-[#9e4300] cursor-pointer"
                        title="Buscar CEP"
                      >
                        <span className="material-symbols-outlined text-xl">search</span>
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-7">
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Logradouro
                    </label>
                    <input
                      type="text"
                      value={newRespForm.address}
                      onChange={(e) =>
                        setNewRespForm({ ...newRespForm, address: e.target.value })
                      }
                      placeholder="Rua, Avenida, etc."
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>
                </div>

                {/* Número e Complemento */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">Número</label>
                    <input
                      type="text"
                      value={newRespForm.number}
                      onChange={(e) =>
                        setNewRespForm({ ...newRespForm, number: e.target.value })
                      }
                      placeholder="S/N"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Complemento
                    </label>
                    <input
                      type="text"
                      value={newRespForm.complement}
                      onChange={(e) =>
                        setNewRespForm({ ...newRespForm, complement: e.target.value })
                      }
                      placeholder="Apto, Bloco, etc."
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>
                </div>

                {/* Bairro, Cidade e UF */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">Bairro</label>
                    <input
                      type="text"
                      value={newRespForm.neighborhood}
                      onChange={(e) =>
                        setNewRespForm({ ...newRespForm, neighborhood: e.target.value })
                      }
                      placeholder="Nome do bairro"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">Cidade</label>
                    <input
                      type="text"
                      value={newRespForm.city}
                      onChange={(e) => setNewRespForm({ ...newRespForm, city: e.target.value })}
                      placeholder="Sua cidade"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#9e4300]/25 outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">UF</label>
                    <div className="relative">
                      <select
                        value={newRespForm.state}
                        onChange={(e) =>
                          setNewRespForm({ ...newRespForm, state: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] appearance-none focus:ring-2 focus:ring-[#9e4300]/25 outline-none cursor-pointer pr-8"
                      >
                        <option value="">Selecione</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        <option value="RS">RS</option>
                        <option value="BA">BA</option>
                        <option value="DF">DF</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-[#584237]/60 text-lg pointer-events-none">
                        keyboard_arrow_down
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões do Rodapé: Cancelar e Salvar Cadastro */}
              <div className="flex items-center justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveNav('alunos');
                    setCurrentScreen(previousScreen);
                  }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-[#584237] hover:bg-[#f5f3f3] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full text-sm font-bold bg-[#9e4300] hover:bg-[#7d3500] text-white shadow-xl shadow-[#9e4300]/25 hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
                >
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        ) : currentScreen === 'create' ? (
          <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 animate-fade-in">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#584237]/70">
                <button
                  type="button"
                  onClick={() => setCurrentScreen('list')}
                  className="hover:text-[#9e4300] hover:underline cursor-pointer"
                >
                  Dashboard
                </button>
                <span>›</span>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('list')}
                  className="hover:text-[#9e4300] hover:underline cursor-pointer"
                >
                  Alunos
                </button>
                <span>›</span>
                <span className="text-[#9e4300] font-bold">Novo Aluno</span>
              </div>

              <button
                type="button"
                onClick={() => setCurrentScreen('list')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#584237] hover:text-[#9e4300] bg-white px-3.5 py-1.5 rounded-full border border-[#f0eded] shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                <span>Voltar para Lista de Alunos</span>
              </button>
            </div>

            {/* Layout em 2 colunas: Formulário à esquerda e Resumo à direita */}
            <form onSubmit={handleFinalizeCadastro} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Coluna Esquerda: Os 4 Cards Principais */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* CARD 1: Dados do Aluno */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">person_add</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                        Dados do Aluno
                      </h3>
                      <p className="text-xs text-[#584237]/75 font-normal">
                        Informações básicas de identificação
                      </p>
                    </div>
                  </div>

                  {/* Foto / Ícone do Aluno */}
                  <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center overflow-hidden shadow-sm">
                        <span className="material-symbols-outlined text-3xl sm:text-4xl">person</span>
                      </div>
                      <div
                        className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#c2410c] text-white flex items-center justify-center shadow-md"
                        title="Ícone do aluno"
                      >
                        <span className="material-symbols-outlined text-xs">account_circle</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1b1c1c]">Identificação do Aluno</h4>
                      <p className="text-[11px] text-[#584237]/70">
                        Ícone padrão do aluno no sistema
                      </p>
                    </div>
                  </div>

                  {/* Nome Completo */}
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={createForm.name}
                      onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                      placeholder="Ex: Arthur Cavalcanti Silva"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                    />
                  </div>

                  {/* Data de Nascimento e RG */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Data de Nascimento
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={createForm.birthDate}
                          onChange={(e) =>
                            setCreateForm({ ...createForm, birthDate: e.target.value })
                          }
                          placeholder="mm/dd/yyyy"
                          className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none pr-10"
                        />
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#584237]/60 text-lg pointer-events-none">
                          calendar_today
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">RG</label>
                      <input
                        type="text"
                        value={createForm.rg}
                        onChange={(e) => setCreateForm({ ...createForm, rg: e.target.value })}
                        placeholder="00.000.000-0"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                  </div>

                  {/* CPF e Telefone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">CPF</label>
                      <input
                        type="text"
                        value={createForm.cpf}
                        onChange={(e) => setCreateForm({ ...createForm, cpf: e.target.value })}
                        placeholder="000.000.000-0"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Telefone
                      </label>
                      <input
                        type="text"
                        value={createForm.phone}
                        onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                  </div>

                  {/* Nível Escolar */}
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Nível Escolar
                    </label>
                    <div className="relative">
                      <select
                        value={createForm.schoolGrade}
                        onChange={(e) =>
                          setCreateForm({ ...createForm, schoolGrade: e.target.value })
                        }
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] appearance-none focus:ring-2 focus:ring-[#c2410c]/25 outline-none cursor-pointer pr-10"
                      >
                        <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                        <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                        <option value="Ensino Médio">Ensino Médio</option>
                        <option value="Educação Infantil">Educação Infantil</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#584237]/60 text-lg pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Instituição de Ensino */}
                  <div>
                    <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                      Instituição de Ensino
                    </label>
                    <input
                      type="text"
                      value={createForm.schoolName}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, schoolName: e.target.value })
                      }
                      placeholder="Nome da escola atual"
                      className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                    />
                  </div>
                </div>

                {/* CARD 2: Endereço Residencial */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">location_on</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                        Endereço Residencial
                      </h3>
                      <p className="text-xs text-[#584237]/75 font-normal">
                        Localização de residência do aluno
                      </p>
                    </div>
                  </div>

                  {/* CEP e Logradouro */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-4">
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">CEP</label>
                      <input
                        type="text"
                        value={createForm.cep}
                        onChange={(e) => setCreateForm({ ...createForm, cep: e.target.value })}
                        placeholder="00000-000"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-8">
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Logradouro
                      </label>
                      <input
                        type="text"
                        value={createForm.address}
                        onChange={(e) =>
                          setCreateForm({ ...createForm, address: e.target.value })
                        }
                        placeholder="Ex: Rua das Flores"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                  </div>

                  {/* Número, Complemento e Bairro */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Número
                      </label>
                      <input
                        type="text"
                        value={createForm.number}
                        onChange={(e) =>
                          setCreateForm({ ...createForm, number: e.target.value })
                        }
                        placeholder="123"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={createForm.complement}
                        onChange={(e) =>
                          setCreateForm({ ...createForm, complement: e.target.value })
                        }
                        placeholder="Apto, Bloco, etc."
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={createForm.neighborhood}
                        onChange={(e) =>
                          setCreateForm({ ...createForm, neighborhood: e.target.value })
                        }
                        placeholder="Centro"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                  </div>

                  {/* UF e Cidade */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">UF</label>
                      <div className="relative">
                        <select
                          value={createForm.state}
                          onChange={(e) =>
                            setCreateForm({ ...createForm, state: e.target.value })
                          }
                          className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] appearance-none focus:ring-2 focus:ring-[#c2410c]/25 outline-none cursor-pointer pr-10"
                        >
                          <option value="São Paulo">São Paulo</option>
                          <option value="Rio de Janeiro">Rio de Janeiro</option>
                          <option value="Minas Gerais">Minas Gerais</option>
                          <option value="Paraná">Paraná</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#584237]/60 text-lg pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1b1c1c] mb-1.5">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={createForm.city}
                        onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })}
                        placeholder="São Paulo"
                        className="w-full px-4 py-3.5 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* CARD 3: Vincular Responsável */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-5">
                  {/* Cabeçalho do Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#d0e4ff] text-[#00629f] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-xl">share</span>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                          Vincular Responsável
                        </h3>
                        <p className="text-xs text-[#584237]/75 font-normal">
                          Selecione ou crie um novo contato
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setPreviousScreen('create');
                        setActiveNav('responsaveis');
                        setCurrentScreen('create-responsible');
                      }}
                      className="px-4 py-2 rounded-full bg-[#ffdbcb] text-[#783100] text-xs font-bold hover:bg-[#fed7aa] transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      <span>Criar Novo Responsável</span>
                    </button>
                  </div>

                  {responsibles.length === 0 ? (
                    <div className="border-2 border-dashed border-[#dfc0b2]/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-[#fbf9f8]/60">
                      <div className="w-12 h-12 rounded-full bg-[#ffdbcb]/60 text-[#783100] flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-2xl">person_add</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1b1c1c]">Nenhum responsável cadastrado</h4>
                      <p className="text-xs text-[#584237]/70 mt-1 max-w-sm leading-relaxed">
                        Nenhuma pré-definição ativa. Utilize o botão &ldquo;Criar Novo Responsável&rdquo; acima para cadastrar e vincular.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Busca de Responsável */}
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#584237]/60 text-lg">
                          search
                        </span>
                        <input
                          type="text"
                          placeholder="Buscar responsável por nome..."
                          value={createForm.responsibleSearch}
                          onChange={(e) =>
                            setCreateForm({ ...createForm, responsibleSearch: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-xs font-medium text-[#1b1c1c] placeholder:text-[#584237]/40 outline-none"
                        />
                      </div>

                      {/* Lista de Responsáveis para Seleção */}
                      <div className="flex flex-col gap-2.5">
                        {responsibles
                          .filter((r) =>
                            r.name
                              .toLowerCase()
                              .includes(createForm.responsibleSearch.toLowerCase())
                          )
                          .map((resp) => {
                            const isSelected = createForm.selectedResponsibleId === resp.id;

                            return (
                              <div
                                key={resp.id}
                                onClick={() =>
                                  setCreateForm((prev) => ({
                                    ...prev,
                                    selectedResponsibleId: resp.id,
                                  }))
                                }
                                className={`p-3 sm:p-4 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                                  isSelected
                                    ? 'bg-[#f5f3f3] border-[#dfc0b2] shadow-sm'
                                    : 'bg-[#fbf9f8] border-transparent hover:bg-[#f5f3f3]'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-[#ffdbcb] text-[#783100] overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs">
                                    <span className="material-symbols-outlined text-lg">person</span>
                                  </div>
                                  <div>
                                    <h5 className="font-extrabold text-xs sm:text-sm text-[#1b1c1c]">
                                      {resp.name}
                                    </h5>
                                    <p className="text-[11px] text-[#584237]/70">
                                      {resp.role} • {resp.phone}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {isSelected ? (
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#c2410c]">
                                      <span>Selecionar</span>
                                      <span className="material-symbols-outlined text-lg">
                                        check_circle
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-[#dfc0b2] hover:border-[#c2410c] transition-colors"></div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>

                {/* CARD 4: Plano Inicial */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                  {/* Cabeçalho do Card */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#cbfaf6] text-[#006a65] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">stars</span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-[#1b1c1c] leading-tight">
                        Plano Inicial
                      </h3>
                      <p className="text-xs text-[#584237]/75 font-normal">
                        Selecione o pacote de acompanhamento
                      </p>
                    </div>
                  </div>

                  {/* 3 Opções de Planos (Cards) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Opção 1: Atelier 2x */}
                    <div
                      onClick={() =>
                        setCreateForm((prev) => ({ ...prev, selectedPlan: 'Atelier 2×' }))
                      }
                      className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all border ${
                        createForm.selectedPlan === 'Atelier 2×'
                          ? 'bg-[#fff1e7] border-2 border-[#ea580c] shadow-sm'
                          : 'bg-[#fbf9f8] border-[#f0eded] hover:border-[#dfc0b2]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#c2410c] block mb-1">
                          Apoio
                        </span>
                        <h4 className="font-extrabold text-base text-[#1b1c1c] mb-2">
                          Atelier 2×
                        </h4>
                        <p className="text-xs text-[#584237]/80 leading-relaxed mb-6">
                          Foco em lição de casa e organização básica.
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="text-xl font-black text-[#1b1c1c]">R$ 450</span>
                        <span className="text-xs text-[#584237]/70 font-semibold">/mês</span>
                      </div>
                    </div>

                    {/* Opção 2: Atelier Total (RECOMENDADO) */}
                    <div
                      onClick={() =>
                        setCreateForm((prev) => ({ ...prev, selectedPlan: 'Atelier Total' }))
                      }
                      className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all border relative ${
                        createForm.selectedPlan === 'Atelier Total'
                          ? 'bg-[#fff1e7] border-2 border-[#ea580c] shadow-sm'
                          : 'bg-[#fbf9f8] border-[#f0eded] hover:border-[#dfc0b2]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide bg-[#ffdbcb] text-[#783100]">
                            Recomendado
                          </span>
                          {createForm.selectedPlan === 'Atelier Total' && (
                            <span className="material-symbols-outlined text-[#ea580c] text-lg">
                              check_circle
                            </span>
                          )}
                        </div>
                        <h4 className="font-extrabold text-base text-[#1b1c1c] mb-2">
                          Atelier Total
                        </h4>
                        <p className="text-xs text-[#584237]/80 leading-relaxed mb-6">
                          Acompanhamento diário e reforço focado.
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="text-xl font-black text-[#1b1c1c]">R$ 890</span>
                        <span className="text-xs text-[#584237]/70 font-semibold">/mês</span>
                      </div>
                    </div>

                    {/* Opção 3: Custom Plus */}
                    <div
                      onClick={() =>
                        setCreateForm((prev) => ({ ...prev, selectedPlan: 'Custom Plus' }))
                      }
                      className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all border ${
                        createForm.selectedPlan === 'Custom Plus'
                          ? 'bg-[#fff1e7] border-2 border-[#ea580c] shadow-sm'
                          : 'bg-[#fbf9f8] border-[#f0eded] hover:border-[#dfc0b2]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#c2410c] block mb-1">
                          Elite
                        </span>
                        <h4 className="font-extrabold text-base text-[#1b1c1c] mb-2">
                          Custom Plus
                        </h4>
                        <p className="text-xs text-[#584237]/80 leading-relaxed mb-6">
                          Plano personalizado com mentor exclusivo.
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="text-xl font-black text-[#1b1c1c]">Consultar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Resumo do Cadastro (Sticky) */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="bg-[#fbf9f8] rounded-3xl p-6 border border-[#f0eded] shadow-sm flex flex-col gap-6">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                    Resumo do Cadastro
                  </h4>

                  <div className="flex flex-col gap-5 text-xs">
                    {/* Resumo Aluno */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-base">person</span>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#584237]/70 font-semibold">Aluno</p>
                        <p className="font-bold text-sm text-[#1b1c1c]">
                          {createForm.name.trim() || 'Aguardando preenchimento...'}
                        </p>
                      </div>
                    </div>

                    {/* Resumo Responsável */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#d0e4ff] text-[#00629f] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-base">security</span>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#584237]/70 font-semibold">Responsável</p>
                        {selectedResponsible ? (
                          <>
                            <p className="font-bold text-sm text-[#1b1c1c]">
                              {selectedResponsible.name}
                            </p>
                            <p className="text-[11px] text-[#584237]/75">
                              {selectedResponsible.phone}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-xs text-[#ba1a1a]">
                              Nenhum vinculado
                            </p>
                            <p className="text-[10px] text-[#584237]/60">
                              Aguardando criação de responsável...
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Resumo Plano */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#cbfaf6] text-[#006a65] flex items-center justify-center shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-base">shopping_bag</span>
                      </div>
                      <div>
                        <p className="text-[11px] text-[#584237]/70 font-semibold">Plano</p>
                        <p className="font-bold text-sm text-[#1b1c1c]">
                          {createForm.selectedPlan}
                        </p>
                        <p className="font-black text-sm text-[#c2410c]">
                          {selectedPlanPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão Finalizar Cadastro */}
                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#9e4300] to-[#f2711c] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#9e4300]/25 hover:shadow-2xl hover:translate-y-[-1px] active:scale-95 transition-all text-center cursor-pointer"
                    >
                      Finalizar Cadastro
                    </button>

                    <p className="text-[10px] text-[#584237]/70 text-center leading-relaxed">
                      Ao finalizar, o contrato será enviado automaticamente para assinatura digital do responsável.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* TELA 2: LISTAGEM DA BASE DE ALUNOS (Base de Alunos)                       */
          /* ========================================================================= */
          <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6 md:gap-8">
            {/* Page Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1b1c1c] tracking-tight">
                  Base de Alunos
                </h3>
                <p className="text-[#584237] mt-1 text-sm sm:text-base font-normal">
                  Gerencie os estudantes e seus planos educacionais.
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('create')}
                className="bg-gradient-to-r from-[#9e4300] to-[#f2711c] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold shadow-xl shadow-[#9e4300]/25 flex items-center justify-center gap-2.5 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-[#f2711c]/30 transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl sm:text-2xl">person_add</span>
                <span>Novo Aluno</span>
              </button>
            </div>

            {/* Search & Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Search Input */}
              <div className="sm:col-span-2 lg:col-span-7 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[#584237]/50 group-focus-within:text-[#9e4300] transition-colors text-2xl">
                    search
                  </span>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Pesquisar por nome ou responsável..."
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-[#f5f3f3] border-none rounded-2xl focus:ring-2 focus:ring-[#9e4300]/20 focus:bg-white transition-all text-[#1b1c1c] font-medium placeholder:text-[#584237]/50 outline-none text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#584237]/60 hover:text-[#1b1c1c]"
                  >
                    <span className="material-symbols-outlined text-xl">close</span>
                  </button>
                )}
              </div>

              {/* Plans Dropdown */}
              <div className="sm:col-span-1 lg:col-span-3 relative">
                <select
                  value={selectedPlanFilter}
                  onChange={(e) => setSelectedPlanFilter(e.target.value)}
                  className="w-full px-4 py-3.5 sm:py-4 bg-[#f5f3f3] border-none rounded-2xl focus:ring-2 focus:ring-[#9e4300]/20 text-[#584237] font-medium appearance-none cursor-pointer outline-none text-sm sm:text-base pr-10"
                >
                  <option value="Todos os Planos">Todos os Planos</option>
                  <option value="Pacote Mensal">Pacote Mensal</option>
                  <option value="Pacote Trimestral">Pacote Trimestral</option>
                  <option value="Aula Particular">Aula Particular</option>
                  <option value="Atelier">Atelier</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#584237]">
                  <span className="material-symbols-outlined text-xl">expand_more</span>
                </div>
              </div>

              {/* Filter Button */}
              <div className="sm:col-span-1 lg:col-span-2">
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`w-full px-4 py-3.5 sm:py-4 bg-[#e4e2e2] text-[#584237] font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-[#dbd9d9] active:scale-98 transition-all cursor-pointer text-sm sm:text-base ${
                    statusFilter !== 'Todos' ? 'ring-2 ring-[#f2711c] text-[#9e4300]' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">filter_list</span>
                  <span>Filtros</span>
                  {statusFilter !== 'Todos' && (
                    <span className="w-2 h-2 rounded-full bg-[#f2711c]"></span>
                  )}
                </button>
              </div>
            </div>

            {/* Active Filter Chips */}
            {(searchTerm || selectedPlanFilter !== 'Todos os Planos' || statusFilter !== 'Todos') && (
              <div className="flex flex-wrap items-center gap-2 -mt-2">
                <span className="text-xs text-[#584237] font-semibold uppercase tracking-wider">
                  Filtros ativos:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbcb] text-[#783100] rounded-full text-xs font-bold">
                    Busca: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:opacity-75">
                      ×
                    </button>
                  </span>
                )}
                {selectedPlanFilter !== 'Todos os Planos' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbcb] text-[#783100] rounded-full text-xs font-bold">
                    Plano: {selectedPlanFilter}
                    <button
                      onClick={() => setSelectedPlanFilter('Todos os Planos')}
                      className="hover:opacity-75"
                    >
                      ×
                    </button>
                  </span>
                )}
                {statusFilter !== 'Todos' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdbcb] text-[#783100] rounded-full text-xs font-bold">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter('Todos')} className="hover:opacity-75">
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPlanFilter('Todos os Planos');
                    setStatusFilter('Todos');
                  }}
                  className="text-xs text-[#9e4300] hover:underline font-semibold ml-2 cursor-pointer"
                >
                  Limpar todos
                </button>
              </div>
            )}

            {/* Students Table */}
            <div className="bg-[#f5f3f3] rounded-3xl p-1 overflow-hidden shadow-sm border border-[#f0eded]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[#584237] text-xs sm:text-sm font-bold uppercase tracking-widest border-b border-[#eae8e7]">
                      <th className="px-6 py-5">Aluno</th>
                      <th className="px-6 py-5">RESPONSÁVEL FINANCEIRO</th>
                      <th className="px-6 py-5">Plano de Aula</th>
                      <th className="px-6 py-5">Status</th>
                      <th className="px-6 py-5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eded]">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-[#584237] bg-white">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-4xl text-[#584237]/40">
                              person_search
                            </span>
                            <p className="font-semibold text-base">Nenhum aluno encontrado</p>
                            <p className="text-sm text-[#584237]/70">
                              Tente ajustar os filtros ou os termos da busca.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student, index) => {
                        const isEvenRow = index % 2 === 0;
                        const isTitular = isStudentSelfGuardian(student);

                        return (
                          <tr
                            key={student.id}
                            className={`${
                              isEvenRow ? 'bg-white' : 'bg-[#fbf9f8]'
                            } hover:bg-[#fff9f5] transition-colors group`}
                          >
                            {/* Coluna Aluno */}
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div
                                  onClick={() => handleStudentNameClick(student)}
                                  className={`w-10 h-10 rounded-full ${student.avatarBg} flex items-center justify-center ${student.avatarText} font-bold text-sm select-none shadow-sm cursor-pointer hover:ring-2 hover:ring-[#f2711c] transition-all`}
                                  title="Clique para abrir os detalhes do aluno"
                                >
                                  {student.initials}
                                </div>
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => handleStudentNameClick(student)}
                                    className="font-bold text-[#1b1c1c] text-left leading-none hover:text-[#9e4300] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                                  >
                                    <span>{student.name}</span>
                                  </button>
                                  <p className="text-xs text-[#584237] mt-1 font-medium">
                                    ID: {student.id}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Coluna Responsável Financeiro */}
                            <td className="px-6 py-4 text-[#1b1c1c] font-medium text-sm sm:text-base">
                              {student.guardian || '-'}
                            </td>

                            {/* Coluna Plano de Aula */}
                            <td className="px-6 py-4">
                              {student.planBadgeType === 'orange' ? (
                                <span className="inline-block px-3 py-1 bg-[#ffdbcb] text-[#783100] rounded-full text-xs font-bold whitespace-nowrap">
                                  {student.plan}
                                </span>
                              ) : (
                                <span className="inline-block px-3 py-1 bg-[#e4e2e2] text-[#584237] rounded-full text-xs font-bold whitespace-nowrap">
                                  {student.plan}
                                </span>
                              )}
                            </td>

                            {/* Coluna Status */}
                            <td className="px-6 py-4">
                              {student.status === 'Ativo' ? (
                                <div className="flex items-center gap-1.5 text-[#006a65]">
                                  <span className="w-2 h-2 rounded-full bg-[#00a9a1]"></span>
                                  <span className="text-sm font-bold">Ativo</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-[#584237]/50">
                                  <span className="w-2 h-2 rounded-full bg-[#584237]/40"></span>
                                  <span className="text-sm font-bold">Inativo</span>
                                </div>
                              )}
                            </td>

                            {/* Coluna Ações */}
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleStudentNameClick(student)}
                                  className="p-2 text-[#00629f] bg-[#d0e4ff]/40 hover:bg-[#d0e4ff]/80 rounded-xl transition-all active:scale-95 cursor-pointer"
                                  title="Ver Perfil Detalhado"
                                >
                                  <span
                                    className="material-symbols-outlined text-[20px]"
                                    style={{ fontVariationSettings: "'FILL' 1" }}
                                  >
                                    account_circle
                                  </span>
                                </button>
                                <button
                                  onClick={() => setEditingStudent({ ...student })}
                                  className="p-2 text-[#584237] hover:bg-[#eae8e7] rounded-xl transition-all active:scale-95 cursor-pointer"
                                  title="Editar"
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    edit_note
                                  </span>
                                </button>
                                <button
                                  onClick={() => setStudentToDelete(student)}
                                  className="p-2 text-[#ba1a1a] hover:bg-[#ffdad6]/60 rounded-xl transition-all active:scale-95 cursor-pointer"
                                  title="Excluir"
                                >
                                  <span className="material-symbols-outlined text-[20px]">
                                    delete_outline
                                  </span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination & Stats Footer */}
              <div className="p-4 sm:p-6 bg-white border-t border-[#f0eded] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-[#584237]">
                  Exibindo{' '}
                  <span className="font-bold text-[#1b1c1c]">
                    {filteredStudents.length > 0 ? `1-${filteredStudents.length}` : '0'}
                  </span>{' '}
                  de <span className="font-bold text-[#1b1c1c]">128</span> alunos
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => showToast('Página anterior')}
                    className="px-3 sm:px-4 py-2 rounded-full bg-[#f5f3f3] text-[#584237] font-bold text-xs sm:text-sm hover:bg-[#eae8e7] transition-colors cursor-pointer"
                  >
                    Anterior
                  </button>
                  <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#9e4300] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#9e4300]/20">
                    1
                  </button>
                  <button
                    onClick={() => showToast('Página 2')}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#f5f3f3] text-[#584237] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    2
                  </button>
                  <button
                    onClick={() => showToast('Página 3')}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-[#f5f3f3] text-[#584237] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    3
                  </button>
                  <button
                    onClick={() => showToast('Próxima página')}
                    className="px-3 sm:px-4 py-2 rounded-full bg-[#f5f3f3] text-[#584237] font-bold text-xs sm:text-sm hover:bg-[#eae8e7] transition-colors cursor-pointer"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Navigation Shell */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-effect z-50 px-6 py-3 flex justify-between items-center shadow-[0_-8px_20px_-10px_rgba(0,0,0,0.12)] border-t border-[#dfc0b2]/30">
        <button
          onClick={() => {
            setActiveNav('dashboard');
            setCurrentScreen('list');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeNav === 'dashboard' ? 'text-[#9e4300]' : 'text-[#584237]/60'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">dashboard</span>
          <span className="text-[10px] font-bold">Início</span>
        </button>

        <button
          onClick={() => {
            setActiveNav('alunos');
            setCurrentScreen('list');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeNav === 'alunos' ? 'text-[#9e4300]' : 'text-[#584237]/60'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            group
          </span>
          <span className="text-[10px] font-bold">Alunos</span>
        </button>

        {/* Floating Add Button in Mobile */}
        <div className="relative -top-6">
          <button
            onClick={() => setCurrentScreen('create')}
            className="w-14 h-14 rounded-full bg-[#9e4300] hover:bg-[#f2711c] text-white shadow-xl shadow-[#9e4300]/40 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            title="Novo Aluno"
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </div>

        <button
          onClick={() => {
            setActiveNav('agenda');
            setCurrentScreen('list');
          }}
          className={`flex flex-col items-center gap-1 ${
            activeNav === 'agenda' ? 'text-[#9e4300]' : 'text-[#584237]/60'
          }`}
        >
          <span className="material-symbols-outlined text-2xl">calendar_month</span>
          <span className="text-[10px] font-bold">Agenda</span>
        </button>

        <button
          onClick={() => showToast('Mais opções no menu')}
          className="flex flex-col items-center gap-1 text-[#584237]/60"
        >
          <span className="material-symbols-outlined text-2xl">more_horiz</span>
          <span className="text-[10px] font-bold">Mais</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* MODAL: ALUNO NÃO É O RESPONSÁVEL FINANCEIRO (image_12e24385.png)          */}
      {/* ========================================================================= */}
      {dependentStudent && dependentFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-[2rem] max-w-4xl w-full shadow-2xl overflow-hidden border border-[#f0eded] my-auto relative">
            {/* Header: Foto do aluno, Nome, ATIVO, ID, Matrícula e botão Fechar */}
            <div className="p-6 sm:p-8 pb-4 flex items-start justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Avatar icon */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ffdbcb] text-[#783100] flex items-center justify-center font-bold text-xl ring-2 ring-[#ffdbcb] shadow-sm">
                    <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#783100]">
                      person
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1b1c1c] tracking-tight">
                      {dependentFormData.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#e6f4ea] text-[#137333] text-[11px] font-extrabold rounded-full tracking-wider uppercase">
                      {dependentFormData.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 mt-1.5 text-xs text-[#584237] font-medium flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#584237]/70">
                        badge
                      </span>
                      <span>ID: #{dependentFormData.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#584237]/70">
                        calendar_today
                      </span>
                      <span>Matrícula: {dependentFormData.joinedDate || '12/01/2024'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setDependentStudent(null);
                  setDependentFormData(null);
                }}
                className="text-[#584237]/70 hover:text-[#1b1c1c] p-2 hover:bg-[#f5f3f3] rounded-full transition-colors cursor-pointer"
                title="Fechar"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveDependentChanges}>
              <div className="p-6 sm:p-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Left Column: Contato, Endereço, Histórico de Pagamentos (com Financeiro via Responsável) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Seção Contato */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#c2410c]"></span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                        Contato
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          Telefone
                        </label>
                        <input
                          type="text"
                          value={dependentFormData.guardianPhone || ''}
                          onChange={(e) =>
                            setDependentFormData({
                              ...dependentFormData,
                              guardianPhone: e.target.value,
                            })
                          }
                          placeholder="(11) 98765-4321"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={dependentFormData.email || ''}
                          onChange={(e) =>
                            setDependentFormData({
                              ...dependentFormData,
                              email: e.target.value,
                            })
                          }
                          placeholder="aluno@email.com"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção Endereço */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#00629f]"></span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                        Endereço
                      </h4>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          Rua / Apto
                        </label>
                        <input
                          type="text"
                          value={dependentFormData.address || ''}
                          onChange={(e) =>
                            setDependentFormData({
                              ...dependentFormData,
                              address: e.target.value,
                            })
                          }
                          placeholder="Rua das Palmeiras, 150 - 42"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                            Bairro
                          </label>
                          <input
                            type="text"
                            value={dependentFormData.neighborhood || ''}
                            onChange={(e) =>
                              setDependentFormData({
                                ...dependentFormData,
                                neighborhood: e.target.value,
                              })
                            }
                            placeholder="Vila Mariana"
                            className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            value={dependentFormData.city || ''}
                            onChange={(e) =>
                              setDependentFormData({
                                ...dependentFormData,
                                city: e.target.value,
                              })
                            }
                            placeholder="São Paulo"
                            className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção Histórico de Pagamentos: Financeiro via Responsável */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00a9a1]"></span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                          Histórico de Pagamentos
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          showToast(`Exibindo histórico de pagamentos de ${dependentFormData.name}`)
                        }
                        className="text-xs font-bold text-[#00629f] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ver Todos</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                    {/* Card "Financeiro via Responsável" */}
                    <div className="bg-[#eaf3fc] rounded-2xl p-4 sm:p-5 border border-[#d0e4ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_4px_20px_-4px_rgba(0,98,159,0.06)]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#d0e4ff] text-[#00629f] flex items-center justify-center shrink-0 shadow-sm">
                          <span className="material-symbols-outlined text-2xl">
                            account_balance_wallet
                          </span>
                        </div>
                        <div>
                          <h5 className="font-bold text-sm sm:text-base text-[#1b1c1c]">
                            Financeiro via Responsável
                          </h5>
                          <p className="text-xs text-[#584237]/80 mt-0.5">
                            Pagamentos gerenciados por:{' '}
                            <span className="font-bold text-[#1b1c1c]">
                              {dependentFormData.guardian}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          showToast(
                            `Abrindo painel financeiro do responsável: ${dependentFormData.guardian}`
                          )
                        }
                        className="bg-white hover:bg-[#f0f7ff] text-[#00629f] px-4 py-2.5 rounded-full font-bold text-xs shadow-sm border border-[#d0e4ff]/70 flex items-center gap-1.5 transition-all active:scale-95 shrink-0 cursor-pointer"
                      >
                        <span>Ver Perfil Financeiro</span>
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Plano Acadêmico & Responsáveis Vinculados */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Card Plano Acadêmico */}
                  <div className="bg-[#fff7f2] rounded-3xl p-5 sm:p-6 border border-[#ffdbcb]/60 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[#9e4300]">
                      <span className="material-symbols-outlined text-xl">school</span>
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        Plano Acadêmico
                      </h4>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#584237]/80 uppercase tracking-wider mb-1.5">
                        Plano Selecionado
                      </label>
                      <div className="relative">
                        <select
                          value={dependentFormData.plan}
                          onChange={(e) =>
                            setDependentFormData({
                              ...dependentFormData,
                              plan: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3.5 bg-white border border-[#dfc0b2]/40 rounded-xl text-sm font-bold text-[#1b1c1c] appearance-none cursor-pointer focus:ring-2 focus:ring-[#9e4300]/25 outline-none shadow-sm pr-10"
                        >
                          <option value="Trimestral">Trimestral</option>
                          <option value="Trimestral (Atelier)">Trimestral (Atelier)</option>
                          <option value="Mensal (Atelier)">Mensal (Atelier)</option>
                          <option value="Plano Mensal">Plano Mensal</option>
                          <option value="Particular">Particular</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#584237]">
                          <span className="material-symbols-outlined text-lg">unfold_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#584237] border border-[#ffdbcb]/40">
                      <span className="material-symbols-outlined text-[#9e4300] text-base mt-0.5">
                        info
                      </span>
                      <p className="leading-relaxed">
                        Renovação automática em{' '}
                        <b>{dependentFormData.renewalDate || '12/04/2024'}</b>. Alterações
                        solicitadas hoje valem para o próximo ciclo.
                      </p>
                    </div>
                  </div>

                  {/* Card Responsáveis Vinculados */}
                  <div className="bg-white rounded-3xl p-6 border border-[#f0eded] shadow-sm flex flex-col">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#584237] mb-4">
                      Responsáveis
                    </h4>

                    {/* Item do Responsável Vinculado */}
                    <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#fbf9f8] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#ffdbcb] text-[#783100] flex items-center justify-center ring-2 ring-[#ffdbcb] shadow-sm font-bold text-sm">
                          <span className="material-symbols-outlined text-2xl">person</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-sm text-[#1b1c1c]">
                            {dependentFormData.guardian}
                          </h5>
                          <p className="text-xs text-[#584237]/75 font-medium mt-0.5">
                            {dependentFormData.guardianRole || 'Mãe • Principal'}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          showToast(
                            `Editar dados do responsável: ${dependentFormData.guardian}`
                          )
                        }
                        className="p-2 text-[#584237]/70 hover:text-[#1b1c1c] hover:bg-[#f5f3f3] rounded-xl transition-all cursor-pointer"
                        title="Editar Responsável"
                      >
                        <span className="material-symbols-outlined text-lg">edit_note</span>
                      </button>
                    </div>

                    {/* Botão com Borda Tracejada: + Vincular Novo */}
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          `Vincular novo tutor ou responsável secundário para ${dependentFormData.name}`
                        )
                      }
                      className="w-full mt-4 border-2 border-dashed border-[#dfc0b2]/60 hover:border-[#9e4300] bg-transparent rounded-2xl py-3 px-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1b1c1c] hover:bg-[#fff9f5] transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                      <span>Vincular Novo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions: Descartar / Salvar Alterações */}
              <div className="p-6 sm:p-8 pt-4 border-t border-[#f0eded] flex justify-end items-center gap-4 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    setDependentStudent(null);
                    setDependentFormData(null);
                  }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-[#584237] hover:bg-[#f5f3f3] transition-colors cursor-pointer"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-sm font-bold bg-[#c2410c] hover:bg-[#ea580c] text-white shadow-xl shadow-[#c2410c]/25 hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ALUNO É O PRÓPRIO RESPONSÁVEL FINANCEIRO (image_5fab6e0a.png)       */}
      {/* ========================================================================= */}
      {selfResponsibleStudent && selfResponsibleFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-[2rem] max-w-4xl w-full shadow-2xl overflow-hidden border border-[#f0eded] my-auto relative">
            {/* Top Bar Header with Close Button */}
            <div className="p-6 sm:p-8 pb-4 flex items-start justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Avatar icon */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ffdbcb] text-[#783100] flex items-center justify-center font-bold text-xl ring-2 ring-[#ffdbcb] shadow-sm">
                    <span className="material-symbols-outlined text-3xl sm:text-4xl text-[#783100]">
                      person
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-black text-[#1b1c1c] tracking-tight">
                      {selfResponsibleFormData.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#e6f4ea] text-[#137333] text-[11px] font-extrabold rounded-full tracking-wider uppercase">
                      {selfResponsibleFormData.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6 mt-1.5 text-xs text-[#584237] font-medium flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#584237]/70">
                        badge
                      </span>
                      <span>ID: #{selfResponsibleFormData.id}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base text-[#584237]/70">
                        calendar_today
                      </span>
                      <span>Matrícula: {selfResponsibleFormData.joinedDate || '12/01/2024'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setSelfResponsibleStudent(null);
                  setSelfResponsibleFormData(null);
                }}
                className="text-[#584237]/70 hover:text-[#1b1c1c] p-2 hover:bg-[#f5f3f3] rounded-full transition-colors cursor-pointer"
                title="Fechar"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Body: Two columns layout */}
            <form onSubmit={handleSaveSelfResponsibleChanges}>
              <div className="p-6 sm:p-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
                {/* Left Column: Contato, Endereço, Histórico de Pagamentos com tabela direta */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Seção Contato */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#c2410c]"></span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                        Contato
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          Telefone
                        </label>
                        <input
                          type="text"
                          value={selfResponsibleFormData.guardianPhone || ''}
                          onChange={(e) =>
                            setSelfResponsibleFormData({
                              ...selfResponsibleFormData,
                              guardianPhone: e.target.value,
                            })
                          }
                          placeholder="(11) 98765-4321"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          value={selfResponsibleFormData.email || ''}
                          onChange={(e) =>
                            setSelfResponsibleFormData({
                              ...selfResponsibleFormData,
                              email: e.target.value,
                            })
                          }
                          placeholder="aluno@email.com"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção Endereço */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#00629f]"></span>
                      <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                        Endereço
                      </h4>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                          Rua / Apto
                        </label>
                        <input
                          type="text"
                          value={selfResponsibleFormData.address || ''}
                          onChange={(e) =>
                            setSelfResponsibleFormData({
                              ...selfResponsibleFormData,
                              address: e.target.value,
                            })
                          }
                          placeholder="Rua das Palmeiras, 150 - 42"
                          className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                            Bairro
                          </label>
                          <input
                            type="text"
                            value={selfResponsibleFormData.neighborhood || ''}
                            onChange={(e) =>
                              setSelfResponsibleFormData({
                                ...selfResponsibleFormData,
                                neighborhood: e.target.value,
                              })
                            }
                            placeholder="Vila Mariana"
                            className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#584237]/80 uppercase tracking-wide mb-1">
                            Cidade
                          </label>
                          <input
                            type="text"
                            value={selfResponsibleFormData.city || ''}
                            onChange={(e) =>
                              setSelfResponsibleFormData({
                                ...selfResponsibleFormData,
                                city: e.target.value,
                              })
                            }
                            placeholder="São Paulo"
                            className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#1b1c1c] focus:ring-2 focus:ring-[#c2410c]/25 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção Histórico de Pagamentos: Tabela Direta */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00a9a1]"></span>
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#584237]">
                          Histórico de Pagamentos
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast('Exibindo todo o histórico financeiro')}
                        className="text-xs font-bold text-[#00629f] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Ver Todos</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>

                    <div className="bg-[#fbf9f8] rounded-2xl border border-[#f0eded] overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-[#584237] font-bold uppercase tracking-wider border-b border-[#f0eded] bg-[#f5f3f3]">
                            <th className="px-4 py-3">Descrição</th>
                            <th className="px-4 py-3">Data</th>
                            <th className="px-4 py-3">Valor</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#f0eded]">
                          {(selfResponsibleFormData.paymentHistory || [
                            {
                              id: '1',
                              description: 'Mensalidade Abril',
                              date: '10/04/2024',
                              amount: 'R$ 890,00',
                              status: 'Pago',
                            },
                            {
                              id: '2',
                              description: 'Mensalidade Maio',
                              date: '10/05/2024',
                              amount: 'R$ 890,00',
                              status: 'Pendente',
                            },
                          ]).map((pay) => (
                            <tr key={pay.id} className="bg-white hover:bg-[#fff9f5] transition-colors">
                              <td className="px-4 py-3.5 font-bold text-[#1b1c1c]">
                                {pay.description}
                              </td>
                              <td className="px-4 py-3.5 text-[#584237]">{pay.date}</td>
                              <td className="px-4 py-3.5 font-bold text-[#1b1c1c]">{pay.amount}</td>
                              <td className="px-4 py-3.5">
                                {pay.status === 'Pago' ? (
                                  <div className="flex items-center gap-1.5 text-[#006a65] font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#00a9a1]"></span>
                                    <span>Pago</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 text-[#f2711c] font-bold">
                                    <span className="w-2 h-2 rounded-full bg-[#f2711c]"></span>
                                    <span>Pendente</span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column: Plano Acadêmico & Responsáveis (Nenhum vinculado) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Card Plano Acadêmico */}
                  <div className="bg-[#fff7f2] rounded-3xl p-5 sm:p-6 border border-[#ffdbcb]/60 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[#9e4300]">
                      <span className="material-symbols-outlined text-xl">school</span>
                      <h4 className="text-xs font-black uppercase tracking-wider">
                        Plano Acadêmico
                      </h4>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-[#584237]/80 uppercase tracking-wider mb-1.5">
                        Plano Selecionado
                      </label>
                      <div className="relative">
                        <select
                          value={selfResponsibleFormData.plan}
                          onChange={(e) =>
                            setSelfResponsibleFormData({
                              ...selfResponsibleFormData,
                              plan: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3.5 bg-white border border-[#dfc0b2]/40 rounded-xl text-sm font-bold text-[#1b1c1c] appearance-none cursor-pointer focus:ring-2 focus:ring-[#9e4300]/25 outline-none shadow-sm pr-10"
                        >
                          <option value="Trimestral">Trimestral</option>
                          <option value="Trimestral (Atelier)">Trimestral (Atelier)</option>
                          <option value="Mensal (Atelier)">Mensal (Atelier)</option>
                          <option value="Plano Mensal">Plano Mensal</option>
                          <option value="Particular">Particular</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#584237]">
                          <span className="material-symbols-outlined text-lg">unfold_more</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#584237] border border-[#ffdbcb]/40">
                      <span className="material-symbols-outlined text-[#9e4300] text-base mt-0.5">
                        info
                      </span>
                      <p className="leading-relaxed">
                        Renovação automática em{' '}
                        <b>{selfResponsibleFormData.renewalDate || '12/04/2024'}</b>. Alterações
                        solicitadas hoje valem para o próximo ciclo.
                      </p>
                    </div>
                  </div>

                  {/* Card Responsáveis: Nenhum Responsável Vinculado */}
                  <div className="bg-white rounded-3xl p-6 border border-[#f0eded] shadow-sm flex flex-col items-center text-center">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#584237] w-full text-left mb-6">
                      Responsáveis
                    </h4>

                    {/* People Circle Icon */}
                    <div className="w-16 h-16 rounded-full bg-[#f0eded] flex items-center justify-center text-[#584237]/60 mb-4">
                      <span className="material-symbols-outlined text-3xl">group</span>
                    </div>

                    <h5 className="font-extrabold text-sm sm:text-base text-[#1b1c1c]">
                      Nenhum responsável vinculado
                    </h5>
                    <p className="text-xs text-[#584237]/80 mt-1.5 mb-6 max-w-xs leading-relaxed">
                      Este estudante ainda não possui um tutor ou responsável financeiro associado.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          'Fluxo para vincular um novo tutor ou responsável financeiro.'
                        )
                      }
                      className="bg-[#54a0ff] hover:bg-[#2e86de] text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-400/25 active:scale-95 transition-all cursor-pointer w-full"
                    >
                      <span className="material-symbols-outlined text-lg">person_add</span>
                      <span>Vincular Agora</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions: Descartar / Salvar Alterações */}
              <div className="p-6 sm:p-8 pt-4 border-t border-[#f0eded] flex justify-end items-center gap-4 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    setSelfResponsibleStudent(null);
                    setSelfResponsibleFormData(null);
                  }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-[#584237] hover:bg-[#f5f3f3] transition-colors cursor-pointer"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-sm font-bold bg-[#c2410c] hover:bg-[#ea580c] text-white shadow-xl shadow-[#c2410c]/25 hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar Aluno (Ação Rápida da Tabela) */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#f0eded] relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0eded]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdbcb] text-[#783100] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">edit_note</span>
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-[#1b1c1c]">Editar Aluno</h4>
                  <p className="text-xs text-[#584237]">Atualize os dados de {editingStudent.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-2 text-[#584237] hover:bg-[#f5f3f3] rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="mt-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#584237] mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl focus:ring-2 focus:ring-[#9e4300]/30 outline-none text-sm font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#584237]">
                    Responsável Financeiro
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingStudent({ ...editingStudent, guardian: editingStudent.name })
                    }
                    className="text-[11px] font-bold text-[#c2410c] hover:underline cursor-pointer"
                  >
                    Definir aluno como titular
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={editingStudent.guardian}
                  onChange={(e) =>
                    setEditingStudent({ ...editingStudent, guardian: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl focus:ring-2 focus:ring-[#9e4300]/30 outline-none text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#584237] mb-1.5">
                    Plano de Aula
                  </label>
                  <select
                    value={editingStudent.plan}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, plan: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl focus:ring-2 focus:ring-[#9e4300]/30 outline-none text-sm font-medium"
                  >
                    <option value="Trimestral">Trimestral</option>
                    <option value="Trimestral (Atelier)">Trimestral (Atelier)</option>
                    <option value="Mensal (Atelier)">Mensal (Atelier)</option>
                    <option value="Plano Mensal">Plano Mensal</option>
                    <option value="Particular">Particular</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#584237] mb-1.5">
                    Status
                  </label>
                  <select
                    value={editingStudent.status}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        status: e.target.value as 'Ativo' | 'Inativo',
                      })
                    }
                    className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl focus:ring-2 focus:ring-[#9e4300]/30 outline-none text-sm font-medium"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-[#f0eded]">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-5 py-2.5 rounded-full text-sm font-bold text-[#584237] hover:bg-[#f5f3f3] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#9e4300] hover:bg-[#f2711c] text-white shadow-lg shadow-[#9e4300]/20 transition-all active:scale-95 cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Excluir Aluno */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#f0eded]">
            <div className="w-14 h-14 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">delete_forever</span>
            </div>
            <h4 className="text-xl font-black text-[#1b1c1c]">Excluir Aluno?</h4>
            <p className="text-sm text-[#584237] mt-2">
              Tem certeza que deseja remover <b>{studentToDelete.name}</b> (ID: {studentToDelete.id})
              da base de dados?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStudentToDelete(null)}
                className="flex-1 py-2.5 rounded-full text-sm font-bold bg-[#f5f3f3] text-[#584237] hover:bg-[#eae8e7] transition-all cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteStudent}
                className="flex-1 py-2.5 rounded-full text-sm font-bold bg-[#ba1a1a] hover:bg-red-700 text-white shadow-lg shadow-[#ba1a1a]/25 transition-all active:scale-95 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}



      {/* MODAL: Filtros Adicionais */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#f0eded]">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0eded]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9e4300]">tune</span>
                <h4 className="text-lg font-extrabold text-[#1b1c1c]">Filtros Avançados</h4>
              </div>
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="p-1.5 text-[#584237] hover:bg-[#f5f3f3] rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#584237] mb-2">
                  Status de Matrícula
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Todos', 'Ativo', 'Inativo'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        statusFilter === st
                          ? 'bg-[#9e4300] text-white shadow-md'
                          : 'bg-[#f5f3f3] text-[#584237] hover:bg-[#eae8e7]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#584237] mb-2">
                  Tipo de Plano
                </label>
                <select
                  value={selectedPlanFilter}
                  onChange={(e) => setSelectedPlanFilter(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f3f3] border-none rounded-xl text-sm font-medium text-[#584237] outline-none cursor-pointer"
                >
                  <option value="Todos os Planos">Todos os Planos</option>
                  <option value="Pacote Mensal">Pacote Mensal</option>
                  <option value="Pacote Trimestral">Pacote Trimestral</option>
                  <option value="Aula Particular">Aula Particular</option>
                  <option value="Atelier">Atelier</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center pt-4 border-t border-[#f0eded]">
              <button
                type="button"
                onClick={() => {
                  setStatusFilter('Todos');
                  setSelectedPlanFilter('Todos os Planos');
                }}
                className="text-xs text-[#9e4300] font-bold hover:underline cursor-pointer"
              >
                Resetar Filtros
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-full text-sm font-bold bg-[#9e4300] text-white hover:bg-[#f2711c] shadow-lg transition-all cursor-pointer"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
