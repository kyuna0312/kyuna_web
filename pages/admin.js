import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  HStack,
  VStack,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import Layout from '../components/layouts/page';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../next-i18next.config';
import { Eyebrow, CrystalDivider } from '../components/frost';

// Private admin panel — English only on purpose; it is not part of the
// trilingual public site.
const api = async (path, options = {}) => {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.statusText);
  return res.json();
};

const labelProps = {
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rime',
};

const Admin = () => {
  const toast = useToast();
  const [authed, setAuthed] = useState(null); // null = probing
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [draft, setDraft] = useState({ title: '', content: '' });

  const fail = e => toast({ title: String(e.message || e), status: 'error', duration: 4000 });

  const load = async () => {
    try {
      const [p, pr] = await Promise.all([api('/api/admin/posts'), api('/api/admin/projects')]);
      setPosts(p);
      setProjects(pr);
      setAuthed(true);
    } catch {
      setAuthed(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async e => {
    e.preventDefault();
    try {
      await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
      setPassword('');
      await load();
    } catch (err) {
      fail(err);
    }
  };

  const addPost = async e => {
    e.preventDefault();
    try {
      await api('/api/admin/posts', { method: 'POST', body: JSON.stringify(draft) });
      setDraft({ title: '', content: '' });
      setPosts(await api('/api/admin/posts'));
      toast({ title: 'Post published', status: 'success', duration: 2500 });
    } catch (err) {
      fail(err);
    }
  };

  const deletePost = async id => {
    try {
      await api(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      fail(err);
    }
  };

  const seedProjects = async () => {
    try {
      await api('/api/admin/projects', { method: 'POST', body: JSON.stringify({ action: 'seed' }) });
      setProjects(await api('/api/admin/projects'));
      toast({ title: 'Projects seeded from defaults', status: 'success', duration: 2500 });
    } catch (err) {
      fail(err);
    }
  };

  const saveProject = async p => {
    try {
      await api('/api/admin/projects', { method: 'PUT', body: JSON.stringify(p) });
      toast({ title: `Saved ${p.key}`, status: 'success', duration: 2000 });
    } catch (err) {
      fail(err);
    }
  };

  const setProject = (key, patch) =>
    setProjects(projects.map(p => (p.key === key ? { ...p, ...patch } : p)));

  if (authed === null) return null;

  return (
    <Layout title="Admin">
      <Container maxW="container.md" px={{ base: 4, md: 6 }} pt={{ base: 6, md: 14 }} pb={10}>
        <Eyebrow kanji="管" color="ice">Admin</Eyebrow>
        <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} mb={8}>
          Site data
        </Heading>

        {!authed && (
          <VStack as="form" onSubmit={login} align="stretch" spacing={4} maxW="360px">
            <Text {...labelProps}>Password</Text>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" variant="frost" alignSelf="flex-start">
              Sign in
            </Button>
          </VStack>
        )}

        {authed && (
          <>
            {/* Posts */}
            <Heading as="h2" fontSize="2xl" mb={4}>
              Posts
            </Heading>
            <VStack as="form" onSubmit={addPost} align="stretch" spacing={3} mb={8}>
              <Input
                placeholder="Title (optional)"
                value={draft.title}
                onChange={e => setDraft({ ...draft, title: e.target.value })}
              />
              <Textarea
                placeholder="Write a small post…"
                rows={4}
                value={draft.content}
                onChange={e => setDraft({ ...draft, content: e.target.value })}
              />
              <Button type="submit" variant="frost" alignSelf="flex-start" isDisabled={!draft.content.trim()}>
                Publish
              </Button>
            </VStack>

            {posts.map(post => (
              <Box key={post.id} pt={3} pb={4} borderTop="1px solid" borderColor="hairline">
                <HStack justify="space-between" align="baseline">
                  <Text fontFamily="mono" fontSize="xs" color="ice">
                    {String(post.created_at).slice(0, 10)}
                    {post.title ? ` — ${post.title}` : ''}
                  </Text>
                  <Button size="xs" variant="pane" px={3} py={1} onClick={() => deletePost(post.id)}>
                    delete
                  </Button>
                </HStack>
                <Text fontSize="sm" whiteSpace="pre-wrap" noOfLines={3}>
                  {post.content}
                </Text>
              </Box>
            ))}

            <CrystalDivider my={12} />

            {/* Projects */}
            <HStack justify="space-between" mb={4}>
              <Heading as="h2" fontSize="2xl">
                Projects
              </Heading>
              {projects.length === 0 && (
                <Button size="sm" variant="pane" onClick={seedProjects}>
                  Seed from defaults
                </Button>
              )}
            </HStack>

            {projects.map(p => (
              <Box key={p.key} pt={4} pb={6} borderTop="1px solid" borderColor="hairline">
                <HStack justify="space-between" mb={3}>
                  <Text fontFamily="mono" fontSize="sm" color="frost">
                    {p.key}
                  </Text>
                  <HStack>
                    <Checkbox
                      isChecked={p.featured}
                      onChange={e => setProject(p.key, { featured: e.target.checked })}
                    >
                      <Text {...labelProps}>featured</Text>
                    </Checkbox>
                    <Input
                      w="64px"
                      size="sm"
                      type="number"
                      value={p.sort}
                      onChange={e => setProject(p.key, { sort: e.target.value })}
                    />
                  </HStack>
                </HStack>
                <VStack align="stretch" spacing={2}>
                  <Input
                    size="sm"
                    value={p.title}
                    onChange={e => setProject(p.key, { title: e.target.value })}
                  />
                  <Input
                    size="sm"
                    placeholder="tech"
                    value={p.tech || ''}
                    onChange={e => setProject(p.key, { tech: e.target.value })}
                  />
                  <Input
                    size="sm"
                    placeholder="url"
                    value={p.url || ''}
                    onChange={e => setProject(p.key, { url: e.target.value })}
                  />
                  <Input
                    size="sm"
                    placeholder="github"
                    value={p.github || ''}
                    onChange={e => setProject(p.key, { github: e.target.value })}
                  />
                  {['en', 'jp', 'mn'].map(loc => (
                    <Textarea
                      key={loc}
                      size="sm"
                      rows={2}
                      placeholder={`description (${loc})`}
                      value={p.descriptions?.[loc] || ''}
                      onChange={e =>
                        setProject(p.key, {
                          descriptions: { ...p.descriptions, [loc]: e.target.value },
                        })
                      }
                    />
                  ))}
                  <Button size="sm" variant="frost" alignSelf="flex-start" onClick={() => saveProject(p)}>
                    Save
                  </Button>
                </VStack>
              </Box>
            ))}
          </>
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], nextI18NextConfig)),
    },
  };
}

export default Admin;
